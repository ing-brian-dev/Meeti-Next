import { formatCreatedDate } from "@/src/shared/utils/date"
import { SelectNotification } from "../types/notification.types"

type NotificationListProps = {
    notifications: SelectNotification[]
}

export default function NotificationList({ notifications }: NotificationListProps) {
    return (
        <div
            className="space-y-4 mt-10"
        >
            {notifications.length ? (
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
