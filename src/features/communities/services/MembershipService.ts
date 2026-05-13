import { User } from "@/src/features/auth/types/auth.types";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";
import { ICommunityRepository, communityRepository } from "./CommunityRepository";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { fi } from "zod/v4/locales";

class MembershipService {
    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) { }

    async toggleMembership(communityId: string, user: User) {

        const community = await this.communityRepository.findById(communityId);
        if (!community) return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);
        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id);
            return {
                success: true,
                message: `Te has unido a la comunidad: ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true
                }
            }
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id);
            return {
                success: true,
                message: `Has salido de la comunidad: ${community.name}`,
                newPermissions: {
                    canJoin: true,
                    canLeave: false
                }
            }
        }
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository);