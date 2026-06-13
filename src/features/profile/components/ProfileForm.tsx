"use client"

import { Form, FormError, FormInput, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms";
import UploadImage from "@/src/shared/components/upload/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileInput, ProfileSchema } from "./schemas/profileSchema";


export default function ProfileForm() {

    const methods = useForm({
        resolver: zodResolver(ProfileSchema),
        mode: 'all',
        defaultValues: {
            name: '',
            bio: '',
            image: ''
        }
    });

    const { register,handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data: ProfileInput) => {
        
    }

    return (
        <FormProvider
            {...methods}
        >
            <Form
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormLabel htmlFor='name'>Nombre:</FormLabel>
                <FormInput
                    id="name"
                    type='text'
                    placeholder='Tu Nombre'
                    {...register('name')}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}

                <FormLabel id='bio'>Biografía</FormLabel>
                <FormTextArea
                    id='bio'
                    placeholder='Añade una Descripción o Biografía'
                    {...register('bio')}
                />
                {errors.bio && <FormError>{errors.bio.message}</FormError>}

                <FormLabel>Imagen perfil</FormLabel>
                <UploadImage
                    uploadedImageLabel="Imagen Perfil"
                />

                <FormSubmit
                    value={'Guardar Cambios'}
                />
            </Form>
        </FormProvider>
    )
}
