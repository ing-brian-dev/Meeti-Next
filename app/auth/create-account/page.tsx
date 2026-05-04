import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle('Crear Cuenta')
}

export default function RegisterPage() {
  return (
    <>
      <Heading>
        Crear Cuenta
      </Heading>
      <RegisterForm />
      <nav
        className="mt-20 flex justify-between"
      >
        <Link
          href={'/auth/login'}
          className="font-bold"
        >
          Iniciar Sesión
        </Link>
        <Link
          href={'/auth/forgot-password'}
          className="font-bold"
        >
          Olvide mi Contraseña
        </Link>
      </nav>
    </>
  )
}