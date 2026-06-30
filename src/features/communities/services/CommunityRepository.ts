import { db } from "@/src/db"
import { CommunityWithMembersCount, InsertCommunity, SelectCommunity } from "../types/community.types"
import { community, communityMembers } from "@/src/db/schema"
import { desc, eq, sql } from "drizzle-orm";
import { CommunityInput } from "../schemas/communitySchema";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
    findById(communityId: string): Promise<SelectCommunity | undefined>;
    update(data: CommunityInput, communityId: string): Promise<void>;
    delete(communityId: string): Promise<void>;
    findFeatured(): Promise<CommunityWithMembersCount[]>
}

class CommunityRepository implements ICommunityRepository {

    async create(data: InsertCommunity) {
        const [result] = await db.insert(community).values(data).returning();
        return result;
    }

    async findByUser(userId: string, limit: number = 10) {
        const communities = await db
            .select()
            .from(community)
            .where(eq(community.createdBy, userId))
            .limit(limit);
        return communities;
    }

    async findById(communityId: string) {
        const [result] = await db
            .select()
            .from(community)
            .where(eq(community.id, communityId))
            .limit(1);

        return result;
    }

    async update(data: CommunityInput, communityId: string) {
        await db
            .update(community).set({
                ...data
            }).where(eq(community.id, communityId));
    }

    async delete(communityId: string) {
        await db.delete(community).where(eq(community.id, communityId));
    }

    async findFeatured(){
        const membersCount = sql<string>`(
            SELECT COUNT(*)
            FROM ${communityMembers}
            WHERE ${communityMembers.communityId} = ${community.id}
        )`

        const result = await db
            .select({
                id: community.id,
                name: community.name,
                description: community.description,
                image: community.image,
                membersCount
            })
            .from(community)
            .orderBy(desc(membersCount))
            .limit(3)

        return result;
            
    }
}

export const communityRepository = new CommunityRepository()