"use client"

import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";

export default function CreateCommunity() {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        mode: 'all',
        defaultValues: {
            name: '',
            description: ''
        }
    });
    
    const onSubmit = async (data: CommunityInput) => {
        
    }

    return (
        <FormProvider
            {...methods} // Context from React Hook Form
        >
            <Form
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommunityForm />
                <FormSubmit />
            </Form>
        </FormProvider>
    )
}
