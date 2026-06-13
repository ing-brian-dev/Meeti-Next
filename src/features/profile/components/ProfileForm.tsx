"use client"

import { Form, FormInput, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms";
import UploadImage from "@/src/shared/components/upload/UploadImage";


export default function ProfileForm() {
    return (
        <Form>
            <FormLabel htmlFor='name'>Nombre:</FormLabel>
            <FormInput
                id="name"
                type='text'
                placeholder='Tu Nombre'
            />

            <FormLabel id='bio'>Biografía</FormLabel>
            <FormTextArea
                id='bio'
                placeholder='Añade una Descripción o Biografía'
            />

            <FormLabel>Imagen perfil</FormLabel>

            <FormSubmit
                value={'Guardar Cambios'}
            />
        </Form>
    )
}
