"use client"
import { formatCreatedDate } from "@/src/shared/utils/date"
import { SelectNotification } from "../types/notification.types"
import { useEffect, useState } from "react"
import Pusher from "pusher-js"
import { useSession } from "@/src/lib/auth-client"

type NotificationListProps = {
    notifications: SelectNotification[]
}

export default function NotificationList({ notifications }: NotificationListProps) {

    const [unreadNotifications, setUnreadNotifications] = useState(notifications);
    const { data } = useSession();
    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        });

        const id = `notification-channel-${data?.user.id}`;

        const channel = pusher.subscribe(id);
        channel.bind('new-notification', (notification: SelectNotification) => {
            setUnreadNotifications((prev) => [notification, ...prev]);
        });

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }

    }, [data]);
    return (
        <div
            className="space-y-4 mt-10"
        >
            {unreadNotifications.length ? (
                notifications.map(notification => (
                    <div
                        key={notification.id}
                        className="p-4 rounded-lg shadow-xs shadow-gray-300"
                    >
                        <p>
                            {notification.actorName} - {notification.message} {''}
                            <span
                                className="font-bold"
                            >
                                {notification.target}
                            </span>
                        </p>
                        <p
                            className="text-sm text-gray-500"
                        >
                            {formatCreatedDate(notification.createdAt)}
                        </p>
                    </div>
                ))
            ) : (
                <p
                    className="text-center mt-10 text-lg text-gray-600"
                >
                    No hay notificaciones
                </p>
            )}
        </div>
    )
}
