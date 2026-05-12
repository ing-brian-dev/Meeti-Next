import { db } from "@/src/db"
import { InsertCommunity, SelectCommunity } from "../types/community.types"
import { community } from "@/src/db/schema"
import { eq } from "drizzle-orm";
import { CommunityInput } from "../schemas/communitySchema";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
    findById(communityId: string): Promise<SelectCommunity | undefined>;
    update(data: CommunityInput, communityId: string): Promise<void>;
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
}

export const communityRepository = new CommunityRepository()