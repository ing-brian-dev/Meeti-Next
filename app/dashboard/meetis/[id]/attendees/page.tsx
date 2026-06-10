import { meetiService } from "@/src/features/meetis/services/MeetiService";
import { requireAuth } from "@/src/lib/auth-server";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: PageProps<'/dashboard/meetis/[id]/attendees'>): Promise<Metadata> {
    const { id } = await params;
    const meeti = await meetiService.getMeetiById(id);
    return {
        title: generatePageTitle(`Asistentes Confirmados Meeti: ${meeti.title}`)
    }
}

export default async function MeetiAttendeesPage({ params }: PageProps<'/dashboard/meetis/[id]/attendees'>) {

    const { session } = await requireAuth();
    if (!session) redirect('/auth/login');

    const { id } = await params;
    await meetiService.getMeetiAttendees(id, session.user);

    return (
        <div>MeetiAttendeesPage</div>
    )
}
