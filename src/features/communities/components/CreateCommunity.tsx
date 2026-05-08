"use client"

import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";

export default function CreateCommunity() {
    return (
        <Form>
            <CommunityForm />
            <FormSubmit />
        </Form>
    )
}
