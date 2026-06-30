"use server"

import { ratelimit } from "@/src/lib/limiter";
import { ChangePasswordInput, ChangePasswordSchema, ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SingInInput, SingInSchema, SingUpInput, SingUpSchema } from "../schemas/authSchema";
import { authService } from "../services/AuthService";
import { getClientIp } from "@/src/shared/utils/ip";
import { getMinutesDiffFromNow } from "@/src/shared/utils/date";
import { requireAuth } from "@/src/lib/auth-server";

export async function singUpAction(input: SingUpInput) {

    const ip = await getClientIp();
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) return {
        error: `Limite alcanzado. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
        success: ''
    }

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

    const ip = await getClientIp();
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) return {
        error: `Limite alcanzado. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
        success: ''
    }

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

    const ip = await getClientIp();
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) return {
        error: `Limite alcanzado. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
        success: ''
    }

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

export async function changePasswordAction(input: ChangePasswordInput) {
    const { session } = await requireAuth();
    const data = ChangePasswordSchema.safeParse(input);

    if (!session || !data.success) {
        return {
            error: 'Hubo un error...',
            success: ''
        }
    }

    const result = await authService.chanchePassword(data.data);
    return result;
}