
import * as z from 'zod';

export const registerSchema = z.object({
    first_name : z.string().trim().min(3).max(45),
    last_name : z.string().trim().min(3).max(45),
    email: z.email().trim(),
    password: z.string().trim().regex(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*(){}<>|]).{8,}$/),
});

export const loginSchema = z.object({
   
    email: z.email().trim(),
    password: z.string().trim()
});