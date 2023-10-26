import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const parseEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parseEnv.success) {
  console.error(
    'Invalid environment client variables',
    parseEnv.error.flatten().fieldErrors,
  );

  throw new Error('Invalid environment client variables.');
}

export const envClient = parseEnv.data;
