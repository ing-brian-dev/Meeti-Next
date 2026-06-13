import Heading from "@/src/shared/components/typography/Heading";
import { communityService } from "../services/CommunityService";
import MeetiCard from "../../meetis/components/MeetiCard";


type UpcomingCommunityMeetisProps = {
    communityId: string
}

export default async function UpcomingCommunityMeetis({ communityId }: UpcomingCommunityMeetisProps) {

    const meetis = await communityService.getUpcomingMeetisByCommunity(communityId);

    return (
        <section className="max-w-7xl mx-auto py-10">
            <Heading
                level={2}
                className="text-center"
            >
                Próximos Meetis de esta comunidad
            </Heading>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 lg:p-0">
                {meetis.length ? meetis.map(meeti => (
                    <MeetiCard
                        key={meeti.id}
                        meeti={meeti}
                    />
                ))

                    :
                    <p className="text-center py-10  text-lg text-gray-600 col-span-1 lg:col-span-3">No Hay Próximos Meetis en esta comunidad</p>
                }
            </div>
        </section>
    )
}
