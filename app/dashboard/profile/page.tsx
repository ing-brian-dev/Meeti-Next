import ProfileForm from "@/src/features/profile/components/ProfileForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { requireAuth } from "../../../src/lib/auth-server";
import { redirect } from "next/navigation";

const title = 'Administra tu Perfil';

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default async function page() {


    const { session } = await requireAuth();
    if(!session) redirect('/auth/login');    

    return (
        <>
            <Heading>{title}</Heading>

            <ProfileForm 
                user={session.user}
            />

        </>
    )
}
