import { pusher } from "@/src/shared/utils/pusher";
import { SelectNotification } from "../types/notification.types";

export interface INotificationPusher {
    notify(notification: SelectNotification): Promise<void>;
}

class NotificationPusher implements INotificationPusher {
    async notify(notification: SelectNotification) {
        await pusher.trigger(
            `notification-channel-${notification.userId}`,
            'new-notification',
            notification
        );
    }
}

export const notificationPusher = new NotificationPusher( );