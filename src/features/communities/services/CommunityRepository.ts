import { db } from "@/src/db"
import { InsertCommunity, SelectCommunity } from "../types/community.types"
import { community } from "@/src/db/schema"
import { eq } from "drizzle-orm";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
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
}

export const communityRepository = new CommunityRepository()