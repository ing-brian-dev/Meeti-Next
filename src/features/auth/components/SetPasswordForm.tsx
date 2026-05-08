"use client"

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"

export default function SetPasswordForm() {
    return (
        <Form

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
            />
            <FormLabel
                htmlFor="passwordConfirmation"
            >
                Repetir Password
            </FormLabel>
            <FormInput
                type="password"
                id="passwordConfirmation"
                placeholder="Repite tu password"
            />
            <FormSubmit 
                value="Restablecer password"
            />
        </Form>
    )
}
