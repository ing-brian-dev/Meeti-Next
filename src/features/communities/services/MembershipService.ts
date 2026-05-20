import { User } from "@/src/features/auth/types/auth.types";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";
import { ICommunityRepository, communityRepository } from "./CommunityRepository";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { INotificationRepository, notificationRepository } from "../../notifications/services/NotificationRepository";

class MembershipService {
    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository,
        private notificationRepository: INotificationRepository
    ) { }

    async toggleMembership(communityId: string, user: User) {

        const community = await this.communityRepository.findById(communityId);
        if (!community) return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);
        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id);

            const notification = await this.notificationRepository.create({
                userId: community.createdBy,
                actorName: user.name,
                message: 'Se unio a tu comunidad.',
                target: community.name
            });
            
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

    async getJoinedCommunities(user: User) {
        const joined = await this.membershipRepository.findJoinedCommunities(user.id);

        const enriched = await Promise.all(joined.map(async ({ community }) => {
            const isMember = true;
            const isAdmin = CommunityPolicy.isAdmin(user, community);
            const memberCount = await this.membershipRepository.getMemberCount(community.id);

            return {
                data: community,
                memberCount,
                context: {
                    isMember,
                    isAdmin
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelte(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }
        }));

        return enriched;
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository, notificationRepository);