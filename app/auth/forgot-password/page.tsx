import type { Metadata } from "next";
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
        </>
    )
}
