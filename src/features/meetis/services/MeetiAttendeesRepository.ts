import { db } from "@/src/db";

export interface IMeetiAttendeesRepository {
    isUserAttending(userId: string, meetiId: string): Promise<boolean>;
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
    async isUserAttending(userId: string, meetiId: string) {
        const result = await db.query.meetiAttendees.findFirst({
            where: {
                AND : [
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
}

export const meetiAttendeesRespository = new MeetiAttendeesRepository();