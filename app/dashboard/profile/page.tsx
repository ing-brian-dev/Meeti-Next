import ProfileForm from "@/src/features/profile/components/ProfileForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

const title = 'Administra tu Perfil';

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default function page() {
    return (
        <>
            <Heading>{title}</Heading>

            <ProfileForm />
            
        </>
    )
}
