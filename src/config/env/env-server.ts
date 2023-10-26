import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error(
    'Invalid environment server variables',
    parseEnv.error.flatten().fieldErrors,
  );

  throw new Error('Invalid environment server variables.');
}

export const envServer = parseEnv.data;
