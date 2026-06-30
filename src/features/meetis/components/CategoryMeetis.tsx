import { meetiService } from "../services/MeetiService"
import MeetiCard from "./MeetiCard";

type CategoryMeetisProps = {
    categoryId: string
}

export default async function CategoryMeetis({ categoryId }: CategoryMeetisProps) {


    const meetis = await meetiService.getMeetisByCategory(categoryId);

    return (
        <>
            {meetis.length ? (
                <div 
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 lg:px-0 py-10"
                >
                    {meetis.map(meeti => <MeetiCard key={meeti.id} meeti={meeti} />)}
                </div>
            ) : (
                <p
                    className="text-center mt-10 text-lg text-gray-600"
                >
                    No Hay Próximos Meetis en esta categoría
                </p>
            )}
        </>
    )
}
