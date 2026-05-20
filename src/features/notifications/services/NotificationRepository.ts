import { db } from "@/src/db";
import { InsertNotification, SelectNotification } from "../types/notification.types";
import { notifications } from "@/src/db/schema";
import { and, count, eq } from "drizzle-orm";

export interface INotificationRepository {
    create(data: InsertNotification): Promise<SelectNotification>;
    getUnreadCount(userId: string): Promise<number>;
    findByUserId(userId: string): Promise<SelectNotification[]>
}

class NotificationRepository implements INotificationRepository {
    async create(data: InsertNotification) {
        const [result] = await db
            .insert(notifications)
            .values(data).returning();
        return result;
    }

    async getUnreadCount(userId: string) {
        const [result] = await db
            .select({ count: count() })
            .from(notifications)
            .where(
                and(
                    eq(notifications.userId, userId),
                    eq(notifications.read, false)
                )
            );
        return result.count;
    }

    async findByUserId(userId: string) {
        const result = db.query.notifications.findMany({
            where: {
                AND: [
                    { userId: { eq: userId } },
                    { read: { eq: false } }
                ]
            },
            limit: 10,
            orderBy: { createdAt: 'desc' }
        });
        return result;
    }
}

export const notificationRepository = new NotificationRepository();