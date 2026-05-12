import { notFound } from "next/navigation";
import { User } from "../../auth/types/auth.types";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityInput, userId: string) {
        const community = await this.communityRepository.create({
            ...data,
            createdBy: userId
        });
        return community;
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id);
        const enriched = await Promise.all(communities.map(async (community) => {
            const isMember = true;
            const isAdmin = CommunityPolicy.isAdmin(user, community)
            return {
                data: community,
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

    async getCommunity(communityId: string) {
        const community = await this.communityRepository.findById(communityId);

        if (!community) notFound();

        return community;
    }

    async getCommunityDetails(communityId: string, user: User) {

        const community = await this.getCommunity(communityId);

        const isMember = false;
        const isAdmin = CommunityPolicy.isAdmin(user, community);

        return {
            data: community,
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
    }
}

export const communityService = new CommunityService(communityRepository);