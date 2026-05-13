"use client"

import { useState } from "react"
import { CommunityPermissions } from "../types/community.types"
import { toggleMembershipAction } from "../actions/membership-actions";

type CommunityMembershipProps = {
    permissions: CommunityPermissions;
    communityId: string;
}

export default function CommunityMembership({ permissions, communityId }: CommunityMembershipProps) {

    const [canJoin, setCanJoin] = useState(permissions.canJoin);
    const [canLeave, setCanLeave] = useState(permissions.canLeave);

    const handleClick = async () => {
        await toggleMembershipAction(communityId);
    }

    return (
        <>
            {canJoin && (
                <button
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
                    onClick={handleClick}
                >
                    Inscribitme a esta Comunidad
                </button>
            )}

            {canLeave && (
                <button
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
                    onClick={handleClick}
                >
                    Abandonar Comunidad
                </button>
            )}

        </>
    )
}
