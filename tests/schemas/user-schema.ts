import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  gender: z.enum(['male', 'female']),
  status: z.enum(['active', 'inactive']),
});
