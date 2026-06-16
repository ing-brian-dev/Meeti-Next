"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { ProfileInput, ProfileSchema } from "../schemas/profileSchema";
import { profileService } from "../services/profileService";

export async function updateProfileAction(input: ProfileInput) {
    const { session } = await requireAuth();
    if (!session) {
        return {
            error: 'Hubo un error...',
            success: ''
        }
    }

    const data = ProfileSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error...',
            success: ''
        }
    }

    await profileService.updateProfile(data.data);

    return {
        error: '',
        success: 'Perfil Actualizado Correctamente.'
    }
}