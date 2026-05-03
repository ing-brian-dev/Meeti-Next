import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-hero bg-cover h-150 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center max-w-2xl">
                <h1 className="text-3xl lg:text-4xl text-white uppercase font-black text-center">
                    Encuentra Un Meeti o Crea una Comunidad para
                    compartir lo que más te gusta
                </h1>
                <Link
                    className="bg-orange-500 hover:bg-orange-600 transition-colors text-xl text-white py-3 px-10 mt-5 font-bold"
                    href="/auth/create-account"
                >
                    Obtener una cuenta
                </Link>
            </div>
        </section>
    )
}