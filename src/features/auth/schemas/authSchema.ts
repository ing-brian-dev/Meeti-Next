import { z } from 'zod';

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: 'El nombre es requerido.' }),
    email: z.email().min(1, { error: 'El email no es válido.' }),
    password: z.string().trim().min(8, { error: 'El password debe ser mínimo 8 caracteres.' }),
    passwordConfirmation: z.string().trim().min(1, { error: 'El password de confirmación no puede ir vacio.' })
});

export const SingInSchema = BaseAuthSchema.pick({
    email: true
}).extend({
    password: z.string().trim().min(1, { error: 'El password es requerido.' }),
})

export const SingUpSchema = BaseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true,
}).refine((data) => data.password === data.passwordConfirmation, {
    error: 'Los passwords no son iguales',
    path: ['passwordConfirmation']
});

export type SingUpInput = z.infer<typeof SingUpSchema>
export type SingInInput = z.infer<typeof SingInSchema>