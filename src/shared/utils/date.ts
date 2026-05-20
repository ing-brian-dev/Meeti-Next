import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatCreatedDate = (date: Date) => {
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: es
    });
}