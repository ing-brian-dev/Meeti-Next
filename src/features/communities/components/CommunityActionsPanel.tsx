import Link from "next/link"
import { CommunityPermissions } from "../types/community.types"

type CommunityActionsPanelProps = {
    permissions: CommunityPermissions;
    communityId: string
}


export default function CommunityActionsPanel({ permissions, communityId }: CommunityActionsPanelProps) {
    return (
        <div
            className="flex justify-end"
        >
            {permissions.canEdit && (
                <Link
                    href={`/dashboard/communities/${communityId}/edit`}
                    className="font-bold text-lg bg-orange-600 px-5 py-2 text-white"
                    target="_blank"
                >
                    Editar comunidad
                </Link>
            )}
        </div>
    )
}
