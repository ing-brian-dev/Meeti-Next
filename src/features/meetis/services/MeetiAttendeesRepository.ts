import { db } from "@/src/db";
import { meetiAttendees } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

export interface IMeetiAttendeesRepository {
    isUserAttending(userId: string, meetiId: string): Promise<boolean>;
    insert(userId: string, meetiId: string): Promise<void>;
    remove(userId: string, meetiId: string): Promise<void>;
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
    async isUserAttending(userId: string, meetiId: string) {
        const result = await db.query.meetiAttendees.findFirst({
            where: {
                AND: [
                    {
                        meetiId
                    },
                    {
                        userId
                    }
                ]
            }
        });

        return !!result;
    }

    async insert(userId: string, meetiId: string){
        await db.insert(meetiAttendees)
        .values({
            userId,
            meetiId
        });
    }

    async remove(userId: string, meetiId: string) {
        await db.delete(meetiAttendees)
        .where(
            and(
                eq(meetiAttendees.userId, userId),
                eq(meetiAttendees.meetiId, meetiId)
            )
        )
    }
}

export const meetiAttendeesRespository = new MeetiAttendeesRepository();