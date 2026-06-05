import { User } from "../../auth/types/auth.types";
import { INotificationService, notificationService } from "../../notifications/services/NotificationService";
import { MeetiAttendeePolicy } from "../policies/MeetiAttendeePolicy";
import { IMeetiAttendeesRepository, meetiAttendeesRespository } from "./MeetiAttendeesRepository";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";


class MeetiAttendeesService {
    constructor(
        private meetiAttendeesRepository: IMeetiAttendeesRepository,
        private meetiRepository: IMeetiRepository,
        private notificationService: INotificationService
    ) { }

    async toggleAttendance(meetiId: string, user: User) {
        const meeti = await this.meetiRepository.findById(meetiId);
        if (!meeti) throw new Error('Meeti no encontrado.');

        const isAttending = await this.meetiAttendeesRepository.isUserAttending(user.id, meeti.id);

        if (MeetiAttendeePolicy.canConfirm(user, meeti, isAttending)) {
            await this.meetiAttendeesRepository.insert(user.id, meeti.id);

            await this.notificationService.createAndNotify({
                userId: meeti.createdBy,
                actorName: user.name,
                message: 'Confirmo su asistencia al Meeti',
                target: meeti.title
            });

            return {
                success: `Confirmaste tu asistencia al Meeti ${meeti.title}`,
                error: '',
                newPermissions: {
                    canConfirm: false,
                    canCansel: true
                }
            }
        }

        if (MeetiAttendeePolicy.canCancel(user, meeti, isAttending)) {
            await this.meetiAttendeesRepository.remove(user.id, meeti.id);
            
            return {
                success: `Cancelaste tu asistencia al Meeti ${meeti.title}`,
                error: '',
                newPermissions: {
                    canConfirm: true,
                    canCansel: false
                }
            }
        }
    }
}

export const meetiAttendeesService = new MeetiAttendeesService(meetiAttendeesRespository, meetiRepository, notificationService);