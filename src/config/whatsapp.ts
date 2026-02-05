export const WHATSAPP = {
  // International format without +
  phone: '5491156980573',
  // `wa.me` works on both mobile and desktop (redirects to WhatsApp Web when needed)
  baseUrl: 'https://wa.me',
} as const;

export function whatsappUrl(message?: string) {
  const url = new URL(`${WHATSAPP.baseUrl}/${WHATSAPP.phone}`);

  if (message && message.trim()) {
    url.searchParams.set('text', message.trim());
  }

  return url.toString();
}

export function buildWhatsAppLeadMessage(input: {
  nombre?: string;
  telefono?: string;
  email?: string;
  zona?: string;
  fecha?: string;
  horario?: string;
  mensaje?: string;
  servicio?: string;
}) {
  const lines: string[] = [];

  lines.push('Hola! Quiero solicitar un turno.');
  if (input.servicio) lines.push(`Servicio: ${input.servicio}`);
  if (input.nombre) lines.push(`Nombre: ${input.nombre}`);
  if (input.telefono) lines.push(`Teléfono: ${input.telefono}`);
  if (input.email) lines.push(`Email: ${input.email}`);
  if (input.zona) lines.push(`Zona/Dirección: ${input.zona}`);
  if (input.fecha) lines.push(`Fecha preferida: ${input.fecha}`);
  if (input.horario) lines.push(`Horario preferido: ${input.horario}`);
  if (input.mensaje && input.mensaje.trim()) lines.push(`Mensaje: ${input.mensaje.trim()}`);

  return lines.join('\n');
}
