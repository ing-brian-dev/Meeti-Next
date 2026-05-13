"use client"

import { useState } from "react"
import { CommunityPermissions } from "../types/community.types"

type CommunityMembershipProps = {
    permissions: CommunityPermissions
}

export default function CommunityMembership({ permissions }: CommunityMembershipProps) {

    const [canJoin, setCanJoin] = useState(permissions.canJoin);
    const [canLeave, setCanLeave] = useState(permissions.canLeave);

    return (
        <>
            {canJoin && (
                <button
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
                >
                    Inscribitme a esta Comunidad
                </button>
            )}

            {canLeave && (
                <button
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
                >
                    Abandonar Comunidad
                </button>
            )}

        </>
    )
}
