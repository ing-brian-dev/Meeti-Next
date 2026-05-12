import { User } from "../../auth/types/auth.types";
import { SelectCommunity } from "../types/community.types";

export class MembershipPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean): boolean {
        if (isMember) return false;
        if (community.createdBy === user.id) return false;
        return true;
    }

    static canLeave(user: User, community: SelectCommunity, isMember: boolean): boolean { 
         // Owner can't leve of his own community
         if(community.createdBy === user.id) return false;
         return isMember;
    }

}