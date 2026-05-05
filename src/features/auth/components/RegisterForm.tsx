"use client";

import {
    Form,
    FormError,
    FormInput,
    FormLabel,
    FormSubmit
} from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingUpInput, SingUpSchema } from "../schemas/authSchema";
import { singUpAction } from "../actions/auth-action";

export default function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SingUpSchema),
        mode: 'all'
    });



    const onSubmit = async (formData: SingUpInput) => {
        await singUpAction(formData);
        
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel
                htmlFor="name"
            >
                Nombre
            </FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Ingresa tu Nombre."
                {...register('name')}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <FormLabel
                htmlFor="email"
            >
                Email
            </FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Ingresa tu Email."
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <FormLabel
                htmlFor="password"
            >
                Contraseña
            </FormLabel>
            <FormInput
                id="password"
                type="password"
                placeholder="Contraseña - Min. 8 Caracteres."
                {...register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}
            <FormLabel
                htmlFor="password-confirmation"
            >
                Repetir Contraseña
            </FormLabel>
            <FormInput
                id="password-confirmation"
                type="password"
                placeholder="Repite tu Contraseña."
                {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            <FormSubmit
                value="Registrarme"
            />
        </Form>
    )
}
