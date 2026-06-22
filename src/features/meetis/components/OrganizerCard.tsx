import Heading from "@/src/shared/components/typography/Heading";
import Image from "next/image";
import { User } from "../../auth/types/auth.types";
import Link from "next/link";

type OrganizerCardProps = {
    organizer: User
}


export default function OrganizerCard({ organizer }: OrganizerCardProps) {
    const { image, name, id, bio } = organizer;
    return (
        <>
            <Heading level={2} className='text-center'>Organizador</Heading>
            <div className="grid grid-cols-4 items-center gap-3 mt-5">
                <div className="relative mx-auto aspect-square overflow-hidden rounded-full border border-gray-200 bg-white flex items-center justify-center">
                    <Image
                        src={image ? image : '/default.jpg'}
                        alt="Imagen Perfil"
                        width={300}
                        height={300}
                        className="object-cover"
                    />
                </div>
                <div className="col-span-3 space-y-3">
                    <p className="text-lg font-black">{name}</p>
                    <p className="text-gray-500 text-sm">{bio}</p>
                    {/*TODO:*/}
                    <Link
                        href={`/profiles/${id}`}
                        className="font-bold text-sm bg-pink-600 p-2  text-white block w-full text-center"
                    >
                        Ver Perfil
                    </Link>
                </div>
            </div>
        </>
    )
}