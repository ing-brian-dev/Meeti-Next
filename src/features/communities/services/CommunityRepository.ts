import { db } from "@/src/db"
import { InsertCommunity, SelectCommunity } from "../types/community.types"
import { community } from "@/src/db/schema"

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity) {
        const [result] = await db.insert(community).values(data).returning();
        return result;
    }
}

export const communityRepository = new CommunityRepository()