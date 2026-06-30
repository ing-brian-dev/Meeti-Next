import Image from "next/image"
import { SelectCommunity } from "../types/community.types"
import Heading from "@/src/shared/components/typography/Heading"
import Link from "next/link"
import { pluralize } from "@/src/shared/utils/string"


type CommunityCardProps = {
    community: Omit<SelectCommunity, 'createdAt' | 'createdBy'> & {
        membersCount?: string
    }
}

export default function CommunityCard({ community }: CommunityCardProps) {
    return (
        <div className="border border-slate-200 bg-white hover:shadow-lg transition-shadow">
            <div className="overflow-hidden">
                <Image
                    className="object-cover h-60 w-full transition-transform duration-300 ease-in-out hover:scale-120"
                    src={community.image}
                    alt={`Imagen Comunidad ${community.name}`}
                    width={800}
                    height={600}
                    priority
                />
            </div>
            <div className="p-5 space-y-3">
                <Heading
                    level={3}
                    className="font-bold text-2xl h-16"
                >
                    {community.name}
                </Heading>
                { community.membersCount && <p className="text-gray-600 text-sm"> {community.membersCount} {pluralize('Miembro', +community.membersCount)}</p>}
                <p className="line-clamp-3">{community.description}</p>
                <Link
                    href={`/communities/${community.id}`}
                    className="bg-orange-500 hover:bg-orange-600 transition-colors text-xl text-white py-3 px-10 mt-10 font-bold block text-center"
                >
                    Ver Comunidad
                </Link>
            </div>
        </div>
    )
}