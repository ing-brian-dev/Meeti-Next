"use client"

import { Form, FormSubmit } from "@/src/shared/components/forms"
import MeetiForm from "./MeetiForm"
import { useSession } from "@/src/lib/auth-client"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema"

export default function CreateMeeti() {

  const methods = useForm<MeetiInput>({
    resolver: zodResolver(MeetiSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      details: '',
      categoryId: '',
      communityId: '',
      availableSeats: 0,
      date: '',
      time: '',
      image: '',
      virtual: false,
      location: {
        placeName: '',
        address: '',
        city: '',
        country: '',
        lat: 25.776311,
        lng: -80.3121477
      }
    }
  })

  const { isPending } = useSession();
  if (isPending) return 'Cargando...';

  const onSubmit = async (data: MeetiInput) => {
    console.log(data);
  }

  return (
    <FormProvider
      {...methods}
    >
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <MeetiForm />
        <FormSubmit
          value='Creat Meeti'
        />
      </Form>
    </FormProvider>
  )
}
