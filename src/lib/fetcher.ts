import { getSession } from 'next-auth/react';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export async function fetchWithAuth(url: string, init?: RequestInit) {
  const session = await getSession();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    ...init,
  });
}
