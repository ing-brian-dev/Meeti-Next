"use client"

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SetPasswordInput, SetPasswordSchema } from "../schemas/authSchema"
import { redirect, useSearchParams } from "next/navigation"
import { setPasswordAction } from "../actions/auth-action"
import toast from "react-hot-toast"

export default function SetPasswordForm() {

    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    if (!token) redirect('/auth/forgot-password');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(SetPasswordSchema),
        mode: 'all'
    });

    const onSubmit = async (data: SetPasswordInput) => {
        const { error, success } = await setPasswordAction(data, token);

        if (error) { toast.error(error); }
        if (success) {
            toast.success(success);
            redirect('/auth/login');
        }
        reset();
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel
                htmlFor="newPassword"
            >
                Nuevo Password
            </FormLabel>
            <FormInput
                type="password"
                id="newPassword"
                placeholder="Ingresa tu nuevo password"
                {...register('newPassword')}
            />
            {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}
            <FormLabel
                htmlFor="passwordConfirmation"
            >
                Repetir Password
            </FormLabel>
            <FormInput
                type="password"
                id="passwordConfirmation"
                placeholder="Repite tu password"
                {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            <FormSubmit
                value="Restablecer password"
            />
        </Form>
    )
}
