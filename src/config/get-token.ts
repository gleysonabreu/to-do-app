'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export async function getToken(): Promise<string | undefined> {
  const session = await getServerSession(authOptions);

  return session?.accessToken;
}
