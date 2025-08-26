import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10, "JWT_SECRET precisa ter pelo menos 10 caracteres"),
  JWT_EXPIRES_IN: z.string().default("1d"), // força para string
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().url(),
});

export const env = envSchema.parse(process.env);
