import { db } from "@/src/db";
import { communityMembers } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

export interface IMembershipRepository {
    addMember(communityId: string, userId: string): Promise<void>;
    removeMember(communityId: string, userId: string): Promise<void>;
    isMember(communityId: string, userId: string): Promise<boolean>;
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
                    eq(communityMembers.communityId,communityId),
                    eq(communityMembers.userId,userId),
                )
            );
    }
}

export const membershipRepository = new MembershipRepository();