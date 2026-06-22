import Heading from "@/src/shared/components/typography/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
        className="py-10 text-center"
    >
        <Heading>Comunidad No Encontrada</Heading>
        <Link
            href={'/'}
        >
            Tal vez quieras ir al Inicio
        </Link>
    </div>
  )
}
