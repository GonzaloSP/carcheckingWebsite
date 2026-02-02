export const WHATSAPP = {
  // International format without +
  phone: '5491156980573',
  baseUrl: 'https://web.whatsapp.com/send',
} as const;

export function whatsappUrl(message?: string) {
  const url = new URL(WHATSAPP.baseUrl);
  url.searchParams.set('phone', WHATSAPP.phone);

  // Keep an existing message if provided
  if (message && message.trim()) {
    url.searchParams.set('text', message.trim());
  }

  return url.toString();
}
