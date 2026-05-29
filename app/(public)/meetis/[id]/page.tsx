import { meetiService } from "@/src/features/meetis/services/MeetiService";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";


export async function generateMetadata({ params }: PageProps<'/meetis/[id]'>): Promise<Metadata> {
    const { id } = await params;

    const meeti = await meetiService.getMeetiById(id);

    return {
        title: generatePageTitle(`${meeti.title}`),
        openGraph: {
            title: `Meeti - ${meeti.title}`,
            siteName: 'Meeti',
            images: [{
                url: meeti.image,
                width: 1000,
                height: 600,
                alt: `Imagen del Meeti ${meeti.title}`
            }],
            locale: 'es_ES',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Meeti ${meeti.title}`,
            description: 'Únete a este Meeti',
            images: [meeti.image]
        }
    }
}

export default async function MeetiPage(props: PageProps<'/meetis/[id]'> ) {
    const { id } = await props.params;
    await meetiService.getMeetiWithDetails(id);
    return (
        <>
            <h1>MeetiPage</h1>
        </>
    )
}
