"use client"

import { FormError, FormInput, FormLabel, FormTextArea } from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";
import UploadImage from "@/src/shared/components/upload/UploadImage";

export default function CommunityForm() {
    const { register, formState: { errors } } = useFormContext<CommunityInput>();

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
                {...register('name')}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel>
                Imagen Comunidad
            </FormLabel>
            <UploadImage />
            <FormLabel
                htmlFor="description"
            >
                Descripcion Comunidad
            </FormLabel>
            <FormTextArea
                id="description"
                placeholder="Descripción Comunidad"
                {...register('description')}
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
        </>
    )
}
