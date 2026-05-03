import type { Metadata } from "next";
import Hero from "@/src/shared/components/ui/Hero";

export const metadata : Metadata = {
  title: 'Meeti - Inicio'
}

export default function Home() {

  return (
    <>
      <Hero />
    </>
  );
}
