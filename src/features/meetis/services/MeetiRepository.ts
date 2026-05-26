import { db } from "@/src/db";
import { InsertMeeti, SelectMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";

export interface IMeetiRepository {
    insert(data: InsertMeeti): Promise<void>;
    findUpcomingByUserId(userId: string): Promise<SelectMeeti[]>
}

class MeetiRepository implements IMeetiRepository {
    async insert(data: InsertMeeti) {
        const [insertedMeeti] = await db
            .insert(meeti)
            .values(data)
            .returning();

        if (!insertedMeeti.virtual && data.location) {
            await db
                .insert(meetiLocations)
                .values({
                    meetiId: insertedMeeti.id,
                    ...data.location
                });
        }
    }

    async findUpcomingByUserId(userId: string) {
        const today = format(new Date(), 'yyyy-MM-dd');
        const result = await db.query.meeti.findMany({
            where: {
                AND: [
                    {
                        createdBy: {
                            eq: userId
                        }
                    },
                    {
                        date: {
                            gte: today
                        }
                    }
                ]
            },
            orderBy: {
                date: 'asc'
            }
        });
        return result;
    }
}

export const meetiRepository = new MeetiRepository();