import { FormInput, FormLabel, FormTextArea, FormToggle } from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";
import CategoryFormField from "./CategoryFormField";
import dynamic from "next/dynamic";

//upload the compontent when its is necesary without server side rendering
const DynamicLocationPicker = dynamic(() => import('./LocationPicker'), { ssr: false })

export default function MeetiForm() {

    return (
        <>
            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">Detalles Meeti</legend>

                <FormLabel htmlFor="title">Nombre Meeti</FormLabel>
                <FormInput
                    id="title"
                    type="text"
                    placeholder="Titulo Meeti"
                />

                <FormLabel htmlFor="details">Detalles Meeti</FormLabel>
                <FormTextArea
                    id="details"
                    placeholder="Descripción Meeti"
                />

                <CategoryFormField />
                <CommunityFormField />

                <FormLabel htmlFor="availableSeats">Cupo</FormLabel>
                <FormInput
                    type="number"
                    min={1}
                    id="availableSeats"
                    placeholder="Cupo Disponible"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <FormLabel htmlFor="date">Fecha:</FormLabel>
                        <FormInput
                            type="date"
                            id="date"
                        />

                    </div>
                    <div className="space-y-3">
                        <FormLabel htmlFor="time">Hora:</FormLabel>
                        <FormInput
                            type="time"
                            step={1800}
                            id="time"
                        />
                    </div>
                </div>

                <FormLabel htmlFor="virtual">¿Evento Virtual?</FormLabel>
                <FormToggle />
            </fieldset>

            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">
                    Ubicación Meeti
                </legend>

                <FormLabel id="place_name">Nombre Lugar:</FormLabel>
                <FormInput
                    id="place_name"
                    type="text"
                    placeholder="Nombre Lugar evento"
                />
                <DynamicLocationPicker />
            </fieldset>
        </>
    )
}