"use server"

import { requireAuth } from "@/src/lib/auth-server"
import { membershipService } from "../services/MembershipService";

export async function toggleMembershipAction(communityId: string) {
    const { session } = await requireAuth();

    if (!session) throw new Error('Usuario no autenticado.');

    await membershipService.toggleMembership(communityId, session.user);
}