import { User } from "../../auth/types/auth.types";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiAttendeePolicy } from "../policies/MeetiAttendeePolicy";
import { MeetiPolicy } from "../policies/MeetiPolicy";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiAttendeesRepository, meetiAttendeesRespository } from "./MeetiAttendeesRepository";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";


class MeetiService {
    constructor(
        private meetiRepository: IMeetiRepository,
        private communityRepository: ICommunityRepository,
        private meetiAttendeesRespository: IMeetiAttendeesRepository
    ) { }

    async createMeeti(data: MeetiInput, user: User) {
        const community = await this.communityRepository.findById(data.communityId);
        if (!community || !CommunityPolicy.isAdmin(user, community)) {
            throw new Error('No tienes Permisos.');
        }

        await this.meetiRepository.insert({ ...data, createdBy: user.id });
    }

    async getUpcomingMeetisByUser(user: User) {
        const upcomingMeetis = await meetiRepository.findUpcomingByUserId(user.id);

        const enriched = await Promise.all(upcomingMeetis.map(async (meeti) => {

            const attendanceCount = await this.meetiAttendeesRespository.findAttendeesCount(meeti.id);
            return {
                data: meeti,
                attendanceCount,
                context: {
                    isAdmin: MeetiPolicy.isAdmin(user, meeti)
                },
                permissions: {
                    canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                    canEdit: MeetiPolicy.canEdit(user, meeti),
                    canDelete: MeetiPolicy.canDelete(user, meeti),
                }
            }
        }));

        return enriched;
    }

    async getMeetiById(meetiId: string) {
        const meeti = await this.meetiRepository.findById(meetiId);
        if (!meeti) {
            throw new Error('Meeti No Encontrado.');
        }
        return meeti;
    }

    async getMeetiWithDetails(meetiId: string, user?: User) {
        const meeti = await this.meetiRepository.findFullById(meetiId);

        if (!meeti) {
            throw new Error('Meeti no encontrado.');
        }

        if (!user) {
            throw new Error('Usuario');
        }

        const isAttending = await this.meetiAttendeesRespository.isUserAttending(user.id, meeti.id);
        const isAdmin = MeetiPolicy.isAdmin(user, meeti);
        const isPastMeeti = MeetiPolicy.isPastMeeti(meeti);
        return {
            data: meeti,
            context: {
                isAdmin,
                isPastMeeti,
                isAttending
            },
            permissions: {
                canConfirm: MeetiAttendeePolicy.canConfirm(user, meeti, isAttending),
                canCancel: MeetiAttendeePolicy.canCancel(user, meeti, isAttending),
            }
        }
    }

    async getMeetiWithPermissions(meetiId: string, user: User) {
        const meeti = await this.getMeetiById(meetiId);
        return {
            data: meeti,
            context: {
                isAdmin: MeetiPolicy.isAdmin(user, meeti)
            },
            permissions: {
                canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                canEdit: MeetiPolicy.canEdit(user, meeti),
                canDelete: MeetiPolicy.canDelete(user, meeti),
            }
        }
    }

    async updateMeeti(meetiId: string, data: MeetiInput, user: User) {
        const community = await this.communityRepository.findById(data.communityId);
        if (!community || !CommunityPolicy.isAdmin(user, community)) {
            throw new Error('No tienes Permisos.');
        }

        const meeti = await this.getMeetiWithPermissions(meetiId, user);
        if (meeti.permissions.canEdit) {
            throw new Error('No Autorizado.')
        }

        await this.meetiRepository.updateById({ ...data, createdBy: user.id }, meetiId)
    }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository, meetiAttendeesRespository)