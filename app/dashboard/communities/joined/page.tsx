import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import { membershipService } from "@/src/features/communities/services/MembershipService";
import CommunityItem from "@/src/features/communities/components/CommunityItem";

export const metadata: Metadata = {
    title: generatePageTitle('Comunidades a las que ne Uniste')
}

export default async function JoinedCommunitiesPage() {

    const { session } = await requireAuth();
    if (!session) redirect('/auth/login');

    const communities = await membershipService.getJoinedCommunities(session.user);

    return (
        <>
            <Heading>Comunidades a las que ne Uniste</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >
                Volver a mis Comunidades
            </Link>
            {communities.length ? (
                <ul
                    role="list"
                    className="divide-y divide-gray-100 mt-10 shadow-lg p-10"
                >
                    {communities.map(community => (
                        <CommunityItem 
                            key={community.data.id}
                            community={community}
                        />
                    ))}
                </ul>
            ) : (
                <p
                    className="text-center mt-10 text-lg"
                >
                    No te has unido a una comunidad aún
                </p>
            )}
        </>
    )
}
