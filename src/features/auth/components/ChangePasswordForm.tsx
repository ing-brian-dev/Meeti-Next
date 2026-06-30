"use client"

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import Heading from "@/src/shared/components/typography/Heading"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChangePasswordInput, ChangePasswordSchema } from "../schemas/authSchema"
import { changePasswordAction } from "../actions/auth-action"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

export default function ChangePasswordForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        mode: 'all'
    });

    const onSubmit = async (data: ChangePasswordInput) => {
        const { error, success } = await changePasswordAction(data);
        if (error) { toast.error(error) }
        if (success) {
            toast.success(success);
            reset();
            redirect('/dashboard/security');
        }
    }

    if (isSubmitting) return "cargando..."

    return (
        <>
            <Heading level={2} className="mt-10">
                Cambiar Password
            </Heading>

            <div className="mt-10 p-5 border border-gray-200">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor="currentPassword">Password Actual</FormLabel>
                    <FormInput
                        id="currentPassword"
                        type="password"
                        placeholder="Escribe tu Password Actual"
                        {...register('currentPassword')}
                    />
                    {errors.currentPassword && <FormError>{errors.currentPassword.message}</FormError>}

                    <FormLabel htmlFor="newPassword">Nuevo Password</FormLabel>
                    <FormInput
                        id="newPassword"
                        type="password"
                        placeholder="Nuevo Password"
                        {...register('newPassword')}
                    />
                    {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}


                    <FormLabel htmlFor="passwordConfirmation">Repetir Nuevo Password</FormLabel>
                    <FormInput
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Repite el Nuevo Password"
                        {...register('passwordConfirmation')}
                    />
                    {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

                    <div className="flex gap-5 mt-5">
                        <FormLabel htmlFor="revokeOtherSessions">Cerrar sesión en todos los dispositivos </FormLabel>

                        <FormInput
                            id="revokeOtherSessions"
                            type='checkbox'
                            className='accent-orange-500 p-6 size-5'
                            {...register('revokeOtherSessions')}
                        />
                    </div>

                    <FormSubmit value='Cambiar Password' />
                </Form>
            </div>
        </>
    )
}