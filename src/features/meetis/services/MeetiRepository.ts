import { db } from "@/src/db";
import { FullMeeti, InsertMeeti, InsertMeetiLocation, SelectMeeti, SelectMeetiAttendeeWithUser } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

export interface IMeetiRepository {
    insert(data: InsertMeeti): Promise<void>;
    findUpcomingByUserId(userId: string): Promise<SelectMeeti[]>;
    findById(id: string): Promise<SelectMeeti | null>;
    findFullById(id: string): Promise<FullMeeti | null>;
    updateById(data: InsertMeeti, meetiId: string): Promise<void>;
    findAttendeesByMeetiId(meetiId: string): Promise<SelectMeetiAttendeeWithUser[]>;
    findUpcomingByCommunity(communityId: string): Promise<SelectMeeti[]>;
}

class MeetiRepository implements IMeetiRepository {
    async insert(data: InsertMeeti) {
        const [insertedMeeti] = await db
            .insert(meeti)
            .values(data)
            .returning();

        if (!insertedMeeti.virtual && data.location) {
            await this.inserLocation({ meetiId: insertedMeeti.id, ...data.location });
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

    async findById(id: string) {
        const result = await db.query.meeti.findFirst({
            where: {
                id
            },
            with: {
                location: true
            }
        });
        return result ?? null;
    }

    async inserLocation(data: InsertMeetiLocation) {
        await db
            .insert(meetiLocations)
            .values(data);
    }

    async findFullById(id: string) {
        const result = await db.query.meeti.findFirst({
            where: {
                id
            },
            with: {
                location: true,
                category: true,
                community: true,
                admin: true
            }
        });
        return result ?? null;
    }

    async updateById(data: InsertMeeti, meetiId: string) {
        const [updatedMeeti] = await db
            .update(meeti)
            .set(data)
            .where(
                eq(meeti.id, meetiId)
            )
            .returning();

        if (!updatedMeeti.virtual && data.location) {
            const locationExists = await db.query.meetiLocations.findFirst({
                where: {
                    meetiId: updatedMeeti.id
                }
            });

            if (locationExists) {
                await db
                    .update(meetiLocations)
                    .set(data.location)
                    .where(
                        eq(meetiLocations.meetiId, updatedMeeti.id)
                    );
            } else {
                await this.inserLocation({ meetiId: updatedMeeti.id, ...data.location });
            }
        }
    }
    async findAttendeesByMeetiId(meetiId: string) {
        return await db.query.meetiAttendees.findMany({
            where: {
                meetiId
            },
            with: {
                user: true
            }
        });
    }

    async findUpcomingByCommunity(communityId: string) {
        return db.query.meeti.findMany({
            where: {
                communityId
            },
            limit: 3
        })
    }
}

export const meetiRepository = new MeetiRepository();