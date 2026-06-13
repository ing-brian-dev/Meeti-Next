import { communityService } from "../services/CommunityService";


type UpcomingCommunityMeetisProps = {
    communityId: string
}

export default async function UpcomingCommunityMeetis({ communityId }: UpcomingCommunityMeetisProps) {

    const meetis = await communityService.getUpcomingMeetisByCommunity(communityId);
    console.log(meetis);

    return (
        <div>UpcomingCommunityMeetis</div>
    )
}
