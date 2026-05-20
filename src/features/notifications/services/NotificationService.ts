import { InsertNotification, SelectNotification } from "../types/notification.types";
import { INotificationPusher, notificationPusher } from "./NotificationPusher";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";

export interface INotificationService {
    createAndNotify(data: InsertNotification): Promise<void>
    getUnreadCount(userId: string): Promise<number>
    getUserNotifications(userId: string): Promise<SelectNotification[]>
    clearNotifications(userId: string): Promise<void>
}

class NotificationService implements INotificationService {
    constructor(
        private notificationRepository: INotificationRepository,
        private notificationPusher: INotificationPusher
    ) { }

    async createAndNotify(data: InsertNotification) {
        const notification = await this.notificationRepository.create(data);
        await this.notificationPusher.notify(notification);
    }

    async getUnreadCount(userId: string) {
        return await this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotifications(userId: string) {
        return this.notificationRepository.findByUserId(userId);
    }

    async clearNotifications(userId: string) {
        return await this.notificationRepository.delete(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository, notificationPusher);