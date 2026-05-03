import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: generatePageTitle('Iniciar Sesión')
}

export default function LoginPage() {
  return (
    <>
      <Heading
        level={3}
      >
        Iniciar Sesión
      </Heading>
    </>
  )
}