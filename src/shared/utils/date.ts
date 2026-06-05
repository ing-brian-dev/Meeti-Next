import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatCreatedDate = (date: Date) => {
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: es
    });
}

export const formatMeetiDate = (date: string, time: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes, seconds = 0] = time.split(':').map(Number);

    return formatDistanceToNow(new Date(year, month - 1, day, hours, minutes, seconds), {
        addSuffix: true,
        locale: es
    });
}

export const displayDate = (date: string) => format(parseISO(date), 'PPPP', {locale: es});