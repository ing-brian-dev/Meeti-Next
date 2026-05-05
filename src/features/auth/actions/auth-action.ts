"use server"

import { SingUpInput, SingUpSchema } from "../schemas/authSchema";
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