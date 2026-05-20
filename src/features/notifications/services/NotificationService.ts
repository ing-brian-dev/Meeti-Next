import { SelectNotification } from "../types/notification.types";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";


class NotificationService {
    constructor(
        private notificationRepository: INotificationRepository
    ) { }

    async getUnreadCount(userId: string): Promise<number> {
        return await this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotifications(userId: string): Promise<SelectNotification[]> {
        return this.notificationRepository.findByUserId(userId);
    }

    async clearNotifications(userId: string): Promise<void> { 
        return await this.notificationRepository.delete(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository)