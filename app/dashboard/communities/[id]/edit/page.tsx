import { communityService } from "@/src/features/communities/services/CommunityService";
import Heading from "@/src/shared/components/typography/Heading";

export default async function EditCommunityPage(props: PageProps<'/dashboard/communities/[id]/edit'>) {
    const { id } = await props.params;
    const community = await communityService.getCommunity(id);
    console.log(community);
    
    return (
        <>
            <Heading>Editar Comunidad</Heading>
        </>
    )
}

