"use client"

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ForgotPasswordInput, ForgotPasswordSchema } from "../schemas/authSchema";
import { forgotPasswordAction } from "../actions/auth-action";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: 'all'
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        const { error, success } = await forgotPasswordAction(data);

        if (error) return toast.error(error);
        if (success) return toast.success(success);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel >E-mail</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Ingresa tu Email"
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <FormSubmit
                value="Enviar Instrucciones"
            />
        </Form>
    )
}
