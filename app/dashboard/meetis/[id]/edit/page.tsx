import { meetiService } from "@/src/features/meetis/services/MeetiService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { redirect } from "next/navigation";

export default async function EditMeetiPage(props: PageProps<'/dashboard/meetis/[id]/edit'>) {
    const { session } = await requireAuth();
    if (!session) redirect('/auth/login');

    const { id } = await props.params;

    const meeti = await meetiService.getMeetiWithPermissions(id, session.user);
    console.log(meeti);

    return (
        <>
            <Heading>Editar Meeti: </Heading>
        </>
    )
}
