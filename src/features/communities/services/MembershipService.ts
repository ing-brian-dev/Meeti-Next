import { User } from "@/src/features/auth/types/auth.types";


class MembershipService {
    async toggleMembership(communityId: string, user: User) {
        console.log("desde toggleMembership");
        
    }
}

export const membershipService = new MembershipService();