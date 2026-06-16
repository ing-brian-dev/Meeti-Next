import { ProfileInput } from "../schemas/profileSchema";
import { IProfileRepository, profileRepository } from "./profileRepository";

class ProfileService {
    constructor(
        private profileRepository: IProfileRepository
    ) { }


    async updateProfile(data: ProfileInput) {
        console.log(data);

    }


}

export const profileService = new ProfileService(profileRepository); 