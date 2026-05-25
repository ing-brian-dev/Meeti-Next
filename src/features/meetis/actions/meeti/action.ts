"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { MeetiInput, MeetiSchema } from "../../schemas/meetiSchema";
import { meetiService } from "../../services/MeetiService";

export async function createMeetiAction(input: MeetiInput) {
    const { session } = await requireAuth();
    if (!session) {
        return {
            error: 'No Autenticado',
            success: ''
        }
    }

    const data = MeetiSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error...',
            success: ''
        }
    }

    await meetiService.createMeeti(data.data, session.user);

    return {
        error: '',
        success: 'Meeti Creado Correctamente!'
    }
}