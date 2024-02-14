export async function fetchWithAuth<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json()
}

export const defaultLanguage = 'fr-FR'