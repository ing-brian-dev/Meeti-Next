import { User } from "../../auth/types/auth.types";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiPolicy } from "../policies/meeti-policy";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";


class MeetiService {
    constructor(
        private meetiRepository: IMeetiRepository,
        private communityRepository: ICommunityRepository
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
            return {
                data: meeti,
                attendanceCount: 0,
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

        await this.meetiRepository.updateById({ ...data, createdBy: user.id })
    }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository)