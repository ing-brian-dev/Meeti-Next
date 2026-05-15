import { INotificationRepository, notificationRepository } from "./NotificationRepository";


class NotificationService {
    constructor(
        private notificationRepository : INotificationRepository
    ){}

}

export const notificationService = new NotificationService(notificationRepository)