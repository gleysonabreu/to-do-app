import { envClient } from './env/env-client';
import { getToken } from './get-token';

export async function api(path: string, init?: RequestInit): Promise<Response> {
  const baseURL = envClient.NEXT_PUBLIC_API_URL;
  const preFix = '';
  const url = new URL(preFix.concat(path), baseURL);

  const token = await getToken();

  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}
