import { z } from 'zod';

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: 'El nombre es requerido.' }),
    email: z.email({ error: 'El email no es válido.' }).min(1, { error: 'El email es requerido.' }),
    password: z.string().trim().min(8, { error: 'El password debe ser mínimo 8 caracteres.' }),
    passwordConfirmation: z.string().trim().min(1, { error: 'El password de confirmación no puede ir vacio.' }),
    newPassword: z.string().trim().min(8, { error: 'El password debe ser mínimo 8 caracteres.' })
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

export const ForgotPasswordSchema = BaseAuthSchema.pick({
    email: true
});

export const SetPasswordSchema = BaseAuthSchema.pick({
    newPassword: true,
    passwordConfirmation: true
}).refine((data) => data.newPassword === data.passwordConfirmation, {
    error: 'Los passwords no son iguales',
    path: ['passwordConfirmation']
});

export const CheckPasswordSchema = z.object({
    password: z.string().min(1, {error: 'El password es requerido.'})
});

export type SingUpInput = z.infer<typeof SingUpSchema>
export type SingInInput = z.infer<typeof SingInSchema>
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type SetPasswordInput = z.infer<typeof SetPasswordSchema>
export type CheckPasswordInput = z.infer<typeof CheckPasswordSchema>