import { requireAuth } from "@/src/lib/auth-server"
import { redirect } from "next/navigation";
import { communityService } from "../services/CommunityService";
import Link from "next/link";
import CommunityItem from "./CommunityItem";

export default async function MyCommunities() {

  const { session } = await requireAuth();
  if (!session) redirect('/auth/login');

  const communities = await communityService.getUserCommunities(session.user);
  return (
    communities.length ? (
      <ul
        role="list"
        className="mt-10 shadow-lg p-10 divide-y divide-gray-100"
      >
        {communities.map((community) => (
          <CommunityItem 
            key={community.data.id}
            community={community}
          />
        ))}
      </ul>
    ) : <p
      className="text-center mt-10 text-lg"
    >
      No hay Comunidades aún
      <Link
        href={'/dashboard/communities/create'}
        className="text-orange-500 font-bold"
      >
        Comienza Creando una.
      </Link>
    </p>
  )
}
