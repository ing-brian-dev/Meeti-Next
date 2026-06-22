import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import { profileService } from "@/src/features/profile/services/profileService";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { cache } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommunityCard from "@/src/features/communities/components/CommunityCard";
import MeetiCard from "@/src/features/meetis/components/MeetiCard";

const getProfileDetailsCached = cache(async (id: string) => {
    return await profileService.getProfileDetails(id);
});

export async function generateMetadata({ params }: PageProps<'/profiles/[id]'>): Promise<Metadata> {

    const { id } = await params;
    const profile = await getProfileDetailsCached(id);

    return {
        title: generatePageTitle(`Perfil de: ${profile?.name} `),
        openGraph: {
            title: `Perfil - ${profile?.name}`,
            siteName: 'Perfil',
            images: [{
                url: profile?.image ?? `${process.env.APP_URL}/default.jpg`,
                width: 1000,
                height: 600,
                alt: `Imagen del Perfil ${profile?.name}`
            }],
            locale: 'es_ES',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Perfil ${profile?.name}`,
            description: 'Únete a este Perfil',
            images: [profile?.image ?? `${process.env.APP_URL}/default.jpg`]
        }
    }
}

export default async function ProfilePage({ params }: PageProps<'/profiles/[id]'>) {

    const { id } = await params;

    const profile = await getProfileDetailsCached(id);

    if(!profile) notFound();

    return (
        <>
            <main className="max-w-7xl mx-auto mt-10 space-y-5 px-5 lg:p-0 ">
                <div className="space-y-7 mt-10">
                    <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full border border-gray-400">
                        <Image
                            src={profile.image ?? '/default.jpg'}
                            width={600}
                            height={600}
                            alt="Imagen Perfil"
                            className="object-cover size-64"
                            priority
                        />
                    </div>
                    <Heading 
                        level={2}
                        className="text-center"
                    >
                        {profile.name}
                    </Heading>
                    <p className="text-gray-500 text-center text-lg">{profile.bio}</p>
                </div>
            </main>

            {profile.communities.length && (
                <section
                    className="max-w-7xl mx-auto mt-10 space-y-5 px-5 lg:p-0"
                >
                    <Heading
                        level={2}
                        className=""
                    >
                        Communidades de {profile.name}
                    </Heading>

                    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3 mt-10">
                        {profile.communities.map(community => (
                            <CommunityCard 
                                key={community.id}
                                community={community}
                            />
                        ))}
                    </div>
                </section>
            )}

            {profile.meetis.length && (
                <section
                    className="max-w-7xl mx-auto mt-10 space-y-5 px-5 lg:px-0 pb-20"
                >
                    <Heading
                        level={2}
                        className=""
                    >
                        Próximos Meetis Organizados por {profile.name}
                    </Heading>

                    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3 mt-10">
                        {profile.meetis.map(meeti => (
                            <MeetiCard 
                                key={meeti.id}
                                meeti={meeti}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
