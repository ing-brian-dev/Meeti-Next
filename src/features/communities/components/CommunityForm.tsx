"use client"

import { FormInput, FormLabel, FormTextArea } from "@/src/shared/components/forms";

export default function CommunityForm() {
    return (
        <>
            <FormLabel
                htmlFor="name"
            >
                Nombre Comunidad
            </FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Titulo Comunidad"
            />
            <FormLabel
                htmlFor="description"
            >
                Descripcion Comunidad
            </FormLabel>
            <FormTextArea
                id="description"
                placeholder="Descripción Comunidad"
                
            />
        </>
    )
}
