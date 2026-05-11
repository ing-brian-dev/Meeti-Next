import { requireAuth } from "@/src/lib/auth-server"
import { redirect } from "next/navigation";
import { communityService } from "../services/CommunityService";

export default async function MyCommunities() {

    const {session} = await requireAuth();
    if(!session) redirect('/auth/login');

    const communities = await communityService.getUserCommunities(session.user);
  return (
    <div>MyCommunities</div>
  )
}
