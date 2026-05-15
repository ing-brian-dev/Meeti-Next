import { db } from "@/src/db";
import { communityMembers } from "@/src/db/schema";
import { and, count, eq } from "drizzle-orm";
import { JoinedCommunity } from "../types/community.types";

export interface IMembershipRepository {
    addMember(communityId: string, userId: string): Promise<void>;
    removeMember(communityId: string, userId: string): Promise<void>;
    isMember(communityId: string, userId: string): Promise<boolean>;
    findJoinedCommunities(userId: string): Promise<JoinedCommunity[]>;
    getMemberCount(communityId: string): Promise<number>;
}

class MembershipRepository implements IMembershipRepository {

    async addMember(communityId: string, userId: string) {
        await db.insert(communityMembers).values({
            communityId,
            userId
        });
    }

    async isMember(communityId: string, userId: string) {
        const [result] = await db
            .select()
            .from(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId)
                )
            )
            .limit(1);
        return !!result;
    }

    async removeMember(communityId: string, userId: string): Promise<void> {
        await db
            .delete(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId),
                )
            );
    }

    async findJoinedCommunities(userId: string) {
        const result = await db.query.communityMembers.findMany({
            where: {
                userId
            },
            with: {
                community: true,
                user: true
            }
        });
        return result;
    }

    async getMemberCount(communityId: string) {

        const [result] = await db
            .select({
                total: count()
            })
            .from(communityMembers)
            .where(eq(communityMembers.communityId, communityId));

        return result.total;
    }
}

export const membershipRepository = new MembershipRepository();