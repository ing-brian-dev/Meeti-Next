import { INotificationRepository, notificationRepository } from "./NotificationRepository";


class NotificationService {
    constructor(
        private notificationRepository : INotificationRepository
    ){}

    async getUnreadCount(userId: string) : Promise<number> {
        return await this.notificationRepository.getUnreadCount(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository)