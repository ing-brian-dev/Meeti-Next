import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";

const communitiesPromise = fetch('/api/user/communities').then(res => res.json());

function CommunityOptions() {

    const communities = use<{ id: string, name: string }[]>(communitiesPromise);

    return (
        <>
            <FormLabel

            >
                Comunidad Meeti
            </FormLabel>
            <FormSelect

            >
                <option value="" disabled>Selecciona Comunidad</option>
                {communities.map(community =>
                    <option
                        key={community.id}
                        value={community.id}
                    >
                        {community.name}
                    </option>
                )}
            </FormSelect>
        </>
    )
}

export default function CommunityFormField() {
    return (
        <Suspense
            fallback="Cargando"
        >
            <CommunityOptions />
        </Suspense>
    )
}
