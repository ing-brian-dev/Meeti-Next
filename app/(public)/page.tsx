import type { Metadata } from "next";
import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import UpcomingMeetis from "@/src/features/meetis/components/UpcomingMeetis";
import FeaturedCommunities from "@/src/features/communities/components/FeaturedCommunities";
import CategoryList from "@/src/features/meetis/components/CategoryList";

export const metadata : Metadata = {
  title: generatePageTitle("Inicio")
}

export default function Home() {

  return (
    <>
      <Hero />
      <UpcomingMeetis />
      <FeaturedCommunities />
      <CategoryList />
    </>
  );
}
