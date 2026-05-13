import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import MyCommunities from "@/src/features/communities/components/MyCommunities";
import DeleteCommunityModal from "@/src/features/communities/components/DeleteCommunityModal";


export const metadata: Metadata = {
    title: generatePageTitle('Administra tus Comunidades')
}

export default function CommunitiesPage() {
    return (
        <>
            <Heading>Administra tus Comunidades</Heading>
            <div className="flex justify-between flex-col lg:flex-row">
                <Link
                    href="/dashboard/communities/create"
                    className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
                >
                    Crear Comunidad
                </Link>
                <Link
                    href="/dashboard/communities/joined"
                    className="mt-5 block lg:inline-block text-center bg-pink-500 hover:bg-pink-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
                >
                    Comunidades a las que te uniste
                </Link>
            </div>
            <MyCommunities />
            <DeleteCommunityModal />
        </>
    )
}
