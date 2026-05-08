import type { Metadata } from "next";
import Link from "next/link";
import Heading from '@/src/shared/components/typography/Heading';
import { generatePageTitle } from "@/src/shared/utils/metadata";
import SetPasswordForm from "@/src/features/auth/components/SetPasswordForm";

export const metadata: Metadata = {
    title: generatePageTitle('Definir nuevo password')
}

export default function ForgotPasswordPage() {
    return (
        <>
            <Heading>Definir nuevo password</Heading>
            <SetPasswordForm />
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
                    href={'/auth/create-account'}
                    className="font-bold"
                >
                    Crear cuenta
                </Link>
            </nav>
        </>
    )
}
