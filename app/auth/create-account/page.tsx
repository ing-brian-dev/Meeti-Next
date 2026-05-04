import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import type { Metadata } from "next";

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
    </>
  )
}