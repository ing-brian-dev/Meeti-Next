import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";


const title = 'Administra tus Meetis'

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default function MeetisPage() {
    return (
        <>
            <Heading>{title}</Heading>
            <Link
                href="/dashboard/meetis/create"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >
                Crear Meeti
            </Link>
        </>
    )
}
