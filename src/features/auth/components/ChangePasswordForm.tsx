"use client"

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import Heading from "@/src/shared/components/typography/Heading"

export default function ChangePasswordForm() {

  return (
    <>
        <Heading level={2} className="mt-10">
          Cambiar Password
        </Heading>

        <div className="mt-10 p-5 border border-gray-200">
          <Form onSubmit={() => {} }>
            <FormLabel htmlFor="currentPassword">Password Actual</FormLabel>
            <FormInput id="currentPassword" type="password" placeholder="Escribe tu Password Actual" />

            <FormLabel htmlFor="newPassword">Nuevo Password</FormLabel>
            <FormInput id="newPassword" type="password" placeholder="Nuevo Password" />


            <FormLabel htmlFor="passwordConfirmation">Repetir Nuevo Password</FormLabel>
            <FormInput id="passwordConfirmation" type="password" placeholder="Repite el Nuevo Password" />


            <div className="flex gap-5 mt-5">
              <FormLabel htmlFor="revokeOtherSessions">Cerrar sesión en todos los dispositivos </FormLabel>

              <FormInput id="revokeOtherSessions" type='checkbox' className='accent-orange-500 p-6 size-5' />
            </div>

            <FormSubmit value='Cambiar Password' />
          </Form>
        </div>
      </>
    )
}