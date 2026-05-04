"use client"

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"

export default function ForgotPasswordForm() {
    return (
        <Form
        
        >
            <FormLabel >E-mail</FormLabel>
            <FormInput 
                type="email"
                id="email"
                placeholder="Ingresa tu Email"
            />
            <FormSubmit 
                value="Enviar Instrucciones"
            />
        </Form>
    )
}
