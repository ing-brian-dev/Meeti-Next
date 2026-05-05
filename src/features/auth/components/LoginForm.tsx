"use client"

import {
    Form,
    FormLabel,
    FormInput,
    FormSubmit,
    FormError
} from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingInInput, SingInSchema } from "../schemas/authSchema";
import { singInAction } from "../actions/auth-action";
import toast from "react-hot-toast";

export default function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SingInSchema),
        mode: 'all'
    })

    const onSubmit = async (data: SingInInput) => {
        const { success, error } = await singInAction(data);

        if (error) {
            toast.error(error)
        }

        if (success) {
            toast.success(success)
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel
                htmlFor="email"
            >
                E-mail
            </FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Ingresa tu E-mail"
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <FormLabel
                htmlFor="password"
                className="block"
            >
                Password
            </FormLabel>
            <FormInput
                id="password"
                type="password"
                placeholder="Ingresa tu Password"
                {...register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}
            <FormSubmit
                value="Iniciar Sesión"
            />
        </Form>
    )
}
