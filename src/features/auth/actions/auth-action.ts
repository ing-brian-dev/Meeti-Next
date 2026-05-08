"use server"

import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SingInInput, SingInSchema, SingUpInput, SingUpSchema } from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function singUpAction(input: SingUpInput) {
    const data = SingUpSchema.safeParse(input);

    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const response = await authService.register(data.data);
    return response;
}

export async function singInAction(input: SingInInput) {
    const data = SingInSchema.safeParse(input);
    if (!data.success) {
        return {
            error: '',
            success: ''
        }
    }

    const response = await authService.login(input);
    return response;
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
    const data = ForgotPasswordSchema.safeParse(input);

    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const response = await authService.requestPasswordReset(data.data);
    return response;

}

export async function setPasswordAction(input: SetPasswordInput, token: string) {
    const data = SetPasswordSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error.',
            success: ''
        }
    }

    const response = await authService.confirmPasswordReset(data.data, token);
    return response;
}