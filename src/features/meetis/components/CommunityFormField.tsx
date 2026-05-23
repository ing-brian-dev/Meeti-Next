import { FormLabel, FormSelect } from "@/src/shared/components/forms"

function CommunityOptions() {

    return (
        <>
            <FormLabel

            >
                Comunidad Meeti
            </FormLabel>
            <FormSelect 

            >
                <option value="" disabled>Selecciona Comunidad</option>
            </FormSelect>
        </>
    )
}

export default function CommunityFormField() {
    return (
        <div>CommunityFormField</div>
    )
}
