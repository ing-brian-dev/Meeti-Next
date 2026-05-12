import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import CreateCommunity from "@/src/features/communities/components/CreateCommunity";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: generatePageTitle('Crear Comunidad')
}

export default async function CreateCommunityPage() {

    const { session } = await requireAuth();
    if (!session) redirect('/auth/login');
    
    return (
        <>
            <Heading>Crear Comunidad</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >
                Volver a mis Comunidades
            </Link>
            <CreateCommunity />
        </>
    )
}
