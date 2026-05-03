import Heading from "@/src/shared/components/typography/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión"
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