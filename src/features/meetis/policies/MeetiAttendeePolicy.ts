import { User } from "better-auth"
import { MeetiPolicy } from "./MeetiPolicy"
import { SelectMeeti } from "../types/meeti.types"

export class MeetiAttendeePolicy {

    /**
     * Can confirm assistance
     */
    static canConfirm(user: User, meeti: SelectMeeti, isAttending: boolean): boolean {
        // I can't confirm if:
        // - The event has already happened
        // - You are the administrator/owner
        // - You are already attending
        if (MeetiPolicy.isAdmin(user, meeti)) return false
        if (isAttending) return false

        return true
    }

    /**
     * Can cancel assistance
     */
    static canCancel(user: User, meeti: SelectMeeti, isAttending: boolean): boolean {
        // Can't cancel if:
        // - The event has already happened
        // - You are the administrator/owner
        // - you aren't assistance
        if (MeetiPolicy.isAdmin(user, meeti)) return false
        if (!isAttending) return false

        return true
    }
}