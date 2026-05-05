import type { Metadata } from "next";
import Link from "next/link";
import Heading from '@/src/shared/components/typography/Heading';
import { generatePageTitle } from "@/src/shared/utils/metadata";
import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
    title: generatePageTitle('Restablecer password')
}

export default function ForgotPasswordPage() {
    return (
        <>
            <Heading>Recupera tu acceso a Meeti</Heading>
            <ForgotPasswordForm />
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
