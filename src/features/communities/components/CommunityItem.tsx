import Image from "next/image";
import { CommunityWithPermissions } from "../types/community.types"
import Link from "next/link";
import CommunityDropdownMenu from "./CommunityDropDownMenu";

type CommunityItemProps = {
    community: CommunityWithPermissions;
}

export default function CommunityItem({ community }: CommunityItemProps) {

    const { name, image, description } = community.data;

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-start min-w-0 gap-x-4">
                <div className="size-32 flex-none overflow-hidden">
                    <Image
                        src={image}
                        alt={`Imagen Comunidad ${name}`}
                        className="object-cover w-full h-full"
                        width={250}
                        height={250}
                        priority
                    />
                </div>
                <div className="min-w-0 flex-auto">
                    <Link
                        href={`/communities/${community.data.id}`}
                        target="_blank"
                        className="hover:underline font-bold text-lg"
                    >
                        {name}
                    </Link>
                    <p
                        className="text-gray-600 text-sm line-clamp-2"
                    >
                        {description}
                    </p>
                    <p
                        className="text-gray-600 text-sm"
                    >
                        {community.memberCount}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                {community.context.isAdmin &&
                    <CommunityDropdownMenu
                        community={community.data}
                    />
                }
            </div>
        </li>
    )
}