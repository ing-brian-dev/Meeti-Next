import Heading from "@/src/shared/components/typography/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Cuenta"
}

export default function RegisterPage() {
  return (
    <>
      <Heading
        level={1}
      >
        Crear Cuenta
      </Heading>
    </>
  )
}