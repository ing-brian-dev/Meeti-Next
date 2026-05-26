"use client"

import { Form, FormSubmit } from "@/src/shared/components/forms"
import MeetiForm from "./MeetiForm"
import { FormProvider, useForm } from "react-hook-form"
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectMeeti } from "../types/meeti.types"
import { editMeetiAction } from "../actions/meeti/action"

type EditMeetiProps = {
    meeti: SelectMeeti
}

export default function EditMeeti({ meeti }: EditMeetiProps) {
    const methods = useForm<MeetiInput>({
        resolver: zodResolver(MeetiSchema),
        mode: 'all',
        defaultValues: meeti.virtual ? {
            ...meeti,
            virtual: true,
        } : {
            ...meeti,
            location: meeti.location!
        }
    });

    const onSubmit = async (data: MeetiInput) => {
        await editMeetiAction(data, meeti.id);
    }

    return (
        <FormProvider
            {...methods}
        >
            <Form
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <MeetiForm />
                <FormSubmit
                    value="Actualizar"
                />
            </Form>
        </FormProvider>
    )
}
