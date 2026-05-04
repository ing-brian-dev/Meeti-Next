"use client";

import { Form, FormInput, FormLabel } from "@/src/shared/components/forms";

export default function RegisterForm() {
    return (
        <Form>
            <FormLabel
                htmlFor="name"
            >
                Nombre
            </FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Ingresa tu Nombre."
            />
            <FormLabel
                htmlFor="email"
            >
                Email
            </FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Ingresa tu Email."
            />
            <FormLabel
                htmlFor="password"
            >
                Contraseña
            </FormLabel>
            <FormInput
                id="password"
                type="password"
                placeholder="Contraseña - Min. 8 Caracteres."
            />
            <FormLabel
                htmlFor="password-confirmation"
            >
                Repetir Contraseña
            </FormLabel>
            <FormInput
                id="password-confirmation"
                type="password"
                placeholder="Repite tu Contraseña."
            />            
        </Form>
    )
}
