import { auth } from "@/src/lib/auth";
import { ProfileInput } from "../schemas/profileSchema";
import { IProfileRepository, profileRepository } from "./profileRepository";
import { headers } from "next/headers";

class ProfileService {
    constructor(
        private profileRepository: IProfileRepository
    ) { }


    async updateProfile(data: ProfileInput) {
        const { name, image, bio } = data;
        await auth.api.updateUser({
            body : {
               name,
               image,
               bio 
            },
            headers: await headers()
        })

    }


}

export const profileService = new ProfileService(profileRepository); 