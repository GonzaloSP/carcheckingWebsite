/**
 * Local development server for the /api/multas function.
 * Not used in production — Vercel runs api/multas.js directly.
 *
 * Usage:  node api/local-dev.js
 * Reads:  .env.local  (for TWOCAPTCHA_API_KEY)
 */

const path   = require('path');
const fs     = require('fs');

// Load .env.local if it exists
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const express = require('express');
const handler = require('./multas');

const app  = express();
const PORT = 3099;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/api/multas', handler);

app.listen(PORT, () => {
  console.log(`🚗 API local corriendo en http://localhost:${PORT}/api/multas`);
  console.log(
    process.env.TWOCAPTCHA_API_KEY
      ? '✅  TWOCAPTCHA_API_KEY cargada'
      : '⚠️   TWOCAPTCHA_API_KEY no encontrada — ANSV/PBA/CABA/Rosario no funcionarán'
  );
  console.log(
    process.env.CAPSOLVER_API_KEY
      ? '✅  CAPSOLVER_API_KEY cargada — GNC/ARBA automático habilitado'
      : '⚠️   CAPSOLVER_API_KEY no encontrada — GNC y ARBA usarán verificación manual'
  );
});
