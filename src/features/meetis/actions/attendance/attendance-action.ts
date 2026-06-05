"use server"

import { requireAuth } from "@/src/lib/auth-server"
import { meetiAttendeesService } from "../../services/MeetiAttendeesService";

export async function toggleAttendance(meetiId: string) {
    const { session } = await requireAuth();

    if (!session) throw new Error('Usuario no Autenticado.');

    const result = await meetiAttendeesService.toggleAttendance(meetiId, session.user);
    return result;

}