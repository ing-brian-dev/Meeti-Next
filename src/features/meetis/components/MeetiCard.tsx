import Heading from "@/src/shared/components/typography/Heading";
import { SelectMeeti } from "../types/meeti.types";
import Image from "next/image";
import { displayDate } from "@/src/shared/utils/date";
import Link from "next/link";

type MeetiCardProps = {
    meeti: SelectMeeti
}

export default function MeetiCard({ meeti }: MeetiCardProps) {
    return (
        <div className="border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="overflow-hidden">
                <Image
                    src={meeti.image}
                    className="object-cover h-72 w-full transition-transform duration-300 ease-in-out hover:scale-120"
                    width={400}
                    height={600}
                    alt={`Imagen Meeti ${meeti.title}`}
                />
            </div>
            <div className="p-5 space-y-5">
                <p className="text-sm text-gray-600">
                    {displayDate(meeti.date)}
                </p>
                <Heading
                    level={3}
                    className="text-2xl font-bold h-16"
                >
                    {meeti.title}
                </Heading>
                <div className="flex items-center gap-5">
                    <p
                        className="line-clamp-3"
                    >
                        {meeti.details}
                    </p>
                </div>
                <Link
                    href={`/meetis/${meeti.id}`}
                    className="bg-orange-500 hover:bg-orange-600 transition-colors text-xl text-white py-3 px-10 mt-10 font-bold block text-center"
                >
                    Ver Meeti
                </Link>
            </div>
        </div>
    )
}