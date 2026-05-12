import EditCommunity from "@/src/features/communities/components/EditCommunity";
import { communityService } from "@/src/features/communities/services/CommunityService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { notFound, redirect } from "next/navigation";

export default async function EditCommunityPage(props: PageProps<'/dashboard/communities/[id]/edit'>) {

    const { session } = await requireAuth();
    if (!session) redirect('/auth/login');

    const { id } = await props.params;
    const community = await communityService.getCommunityDetails(id, session.user);
    if(!community.permissions.canEdit) notFound();

    return (
        <>
            <Heading>Editar Comunidad</Heading>
            <EditCommunity />
        </>
    )
}

