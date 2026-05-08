import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";

export const metadata: Metadata = {
    title: generatePageTitle('Comunidades a las que ne Uniste')
}

export default function JoinedCommunitiesPage() {
    return (
        <>
            <Heading>Comunidades a las que ne Uniste</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >
                Volver a mis Comunidades
            </Link>
        </>
    )
}
