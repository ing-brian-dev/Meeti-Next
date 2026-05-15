import CommunityActionsPanel from '@/src/features/communities/components/CommunityActionsPanel';
import { communityService } from '@/src/features/communities/services/CommunityService';
import { getServerSession } from '@/src/lib/auth-server';
import Heading from '@/src/shared/components/typography/Heading';
import { generatePageTitle } from '@/src/shared/utils/metadata';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: PageProps<'/communities/[id]'>) : Promise<Metadata> {
    const { id } = await params;
    const community = await communityService.getCommunityDetails(id);
    return {
        title: generatePageTitle(`Comunidad: ${community.data.id}`)
    }
}

export default async function CommunityPage(props: PageProps<'/communities/[id]'>) {

    const { id } = await props.params;
    const session = await getServerSession();
    const community = await communityService.getCommunityDetails(id, session?.user);

    return (
        <>
            <main className="max-w-7xl mx-auto space-y-5 p-10 lg:p-0 mt-10">
                {community.permissions && (
                    <CommunityActionsPanel
                        permissions={community.permissions}
                        communityId={community.data.id}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-10">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full">
                            <Image
                                src={community.data.image}
                                alt={`Imagen de la Comunidad ${community.data.name}`}
                                width={600}
                                height={600}
                                className='object-cover size-64'
                                priority
                            />
                        </div>
                        <Heading
                            classname='text-center'
                        >
                            {community.data.name}
                        </Heading>
                        <p
                            className='text-gray-600 text-lg text-center'
                        >
                            {community.data.description}
                        </p>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-2xl">
                        {/* Admin Aquí */}
                    </div>
                </div>
            </main>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10 max-w-7xl mx-auto mt-10 space-y-5">
                {/* Próximos Meetis Aquí */}
            </div>
        </>
    )
}
