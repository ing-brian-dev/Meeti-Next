import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const { isAuth } = await requireAuth();
  if(!isAuth) redirect('/auth/login');
  
  return (
    <>
      <Heading >Panel de Administracion</Heading>
    </>
  )
}
