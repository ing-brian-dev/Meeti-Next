import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityInput, userId: string) {
        const community = await this.communityRepository.create({
            ...data,
            createdBy: userId
        });
        return community;
    }
}

export const communityService = new CommunityService(communityRepository);