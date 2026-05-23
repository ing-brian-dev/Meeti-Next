import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { SelectCategory } from "../types/meeti.types";

const categoriesPromise = fetch('/api/categories').then(res => res.json());

function CategoryOptions() {

    const categories = use<SelectCategory[]>(categoriesPromise);

    return (
        <>
            <FormLabel>
                Categoría Meeti
            </FormLabel>
            <FormSelect

            >
                <option value="" disabled>Selecciona Categoría</option>
                {categories.map(category =>
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                )}
            </FormSelect>
        </>
    )
}

export default function CategoryFormField() {
    return (
        <Suspense
            fallback="Cargando"
        >
            <CategoryOptions />
        </Suspense>
    )
}
