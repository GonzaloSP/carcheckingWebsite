# multas — Appwrite Function

Node.js 16 function deployed to a self-hosted Appwrite instance. It scrapes 31 Argentine traffic-fine portals and returns structured infraction data for a given plate number.

## Architecture

```
Frontend (Vercel)
  └── ConsultarMultaPage.tsx
        └── callMultasApi()
              └── POST https://server.innsimulation.com/v1/functions/multas/executions
                    └── multas function (Appwrite / self-hosted)
                          └── scrapes each jurisdiction portal
```

The frontend posts an execution request to the Appwrite executions API. The function reads `req.query.fuente` and `req.query.dominio`, scrapes the appropriate portal, and returns JSON.

## Environment variables

Set these in the Appwrite console under **Functions → multas → Settings → Environment variables**:

| Variable | Required | Description |
|---|---|---|
| `TWOCAPTCHA_API_KEY` | Yes (fallback) | 2captcha.com API key — used when Capsolver is unavailable |
| `CAPSOLVER_API_KEY` | Recommended | capsolver.com API key — preferred; faster and higher score for reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | Optional | Google reCAPTCHA v3 secret — validates tokens from the frontend form |
| `MULTA_REQUIRE_PAYMENT` | Optional | Set to `true` to gate captcha-costing fuentes behind a verified MercadoPago payment |
| `MP_ACCESS_TOKEN` | Yes, if `MULTA_REQUIRE_PAYMENT=true` | MercadoPago API token used to verify payments server-side |
| `MULTA_DEV_BYPASS_KEY` | Optional | Shared secret that lets `?dev=nocobrar&devKey=<this value>` skip the payment gate for manual testing. Never expose this in frontend code/env — it must stay server-only |

## Deployment

**Requirements:** access to the Appwrite server (API key with `functions.write` + `execution.write` scopes).

```bash
# From this directory:
tar -czf /tmp/multas-deploy.tar.gz --exclude=.git .

curl -X POST https://server.innsimulation.com/v1/functions/multas/deployments \
  -H "X-Appwrite-Project: 69ab260c001de147f5d5" \
  -H "X-Appwrite-Key: YOUR_API_KEY" \
  -F "code=@/tmp/multas-deploy.tar.gz;type=application/gzip" \
  -F "entrypoint=src/multas.mjs" \
  -F "activate=true"
```

The stored CLI key (with `execution.write`) lives in `~/.appwrite/prefs.json`.

## Testing a jurisdiction

Sync execution (works for most jurisdictions, <30s):

```bash
curl -X POST https://server.innsimulation.com/v1/functions/multas/executions \
  -H "X-Appwrite-Project: 69ab260c001de147f5d5" \
  -H "X-Appwrite-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"body":"","path":"/?dominio=DQN397&fuente=pba","method":"GET","headers":{},"async":false}'
```

## Jurisdictions

| Value | Portal | Notes |
|---|---|---|
| `ansv` | ANSV / SINAI | Old-format plates only. Two-step flow (see below) |
| `pba` | Provincia de Buenos Aires | reCAPTCHA v3 |
| `caba` | CABA | reCAPTCHA v2. Two-step flow |
| `cordoba` | Córdoba Caminera | |
| `santafe` | Santa Fe provincial | |
| `rosario` | Rosario | reCAPTCHA — returns `manualUrl` on failure |
| `mendoza` | Mendoza Ciudad | |
| `mendozacaminera` | Mendoza Caminera | |
| `salta` | Salta Capital | |
| `neuquen` | Neuquén Capital | |
| `santarosa` | Santa Rosa (La Pampa) | |
| `corrientes` | Corrientes | |
| `entrerios` | Entre Ríos | |
| `misiones` | Misiones | |
| `posadas` | Posadas | |
| `chaco` | Chaco | |
| `avellaneda` | Avellaneda | |
| `lanus` | Lanús | Infratrack |
| `berisso` | Berisso | Infratrack |
| `ezeiza` | Ezeiza | Infratrack |
| `lomasdezamora` | Lomas de Zamora | |
| `tresdefebrero` | Tres de Febrero | |
| `hurlingham` | Hurlingham | |
| `canuelas` | Cañuelas | SIGEIN |
| `sanvicente` | San Vicente | SIGEIN |
| `roquesaenzpena` | Roque Sáenz Peña | SIGEIN |
| `villaangostura` | Villa La Angostura | SIGEIN |
| `riotercero` | Río Tercero | SIGEIN |
| `venadotuerto` | Venado Tuerto | Boldt — returns `manualUrl` (captcha blocked) |
| `almirantebrown` | Almirante Brown | Boldt — returns `manualUrl` (captcha blocked) |
| `escobar` | Escobar | Returns `manualUrl` (portal decommissioned) |

## Two-step flow (ANSV and CABA)

These portals require reCAPTCHA solving which takes ~30s — exceeding Appwrite's sync timeout. The frontend splits the call into two executions:

**Step 1** — fetch portal page + submit captcha task to Capsolver (returns in ~5s):
```
GET /?dominio=DQN397&fuente=ansv&step=1
→ { taskMeta: { service, taskId }, session: { cookies, viewState, ... } }
```

**Step 2** — retrieve solved token + query the portal (call after waiting ~35s):
```
POST /?dominio=DQN397&fuente=ansv&step=2
body: { taskMeta, session }
→ { dominio, fuente, infracciones: [...] }
```

The frontend (`callMultasApi` in `ConsultarMultaPage.tsx`) handles this automatically for `TWO_STEP_FUENTES = ['ansv', 'caba']`.

## Adding a new jurisdiction

1. Write a `fetchXxx(dominio)` function in `src/multas.mjs` that returns an array of infraction objects
2. Add a `case 'xxx':` to the `switch (fuente)` block in the handler
3. Add an entry to `src/data/multa-jurisdictions.ts` in the frontend
4. Deploy (see above)

Each infraction object should follow this shape:
```js
{
  acta:         string | null,
  fecha:        string | null,
  descripcion:  string | null,
  lugar:        string | null,
  importe:      number | null,
  estado:       'pendiente' | 'pagada',
  jurisdiccion: string,
}
```

If a portal requires manual interaction (broken captcha, decommissioned, etc.), throw `MANUAL_REQUIRED`:
```js
const err = new Error('MANUAL_REQUIRED');
err.manualUrl = 'https://portal-url.gob.ar/';
throw err;
```
The handler catches this and returns `{ infracciones: [], manualUrl }` with HTTP 200. The frontend renders a direct link to the portal.
