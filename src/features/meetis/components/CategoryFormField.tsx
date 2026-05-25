import { FormError, FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { SelectCategory } from "../types/meeti.types";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";

const categoriesPromise = fetch('/api/categories').then(res => res.json());

function CategoryOptions() {

    const { register, formState: { errors } } = useFormContext<MeetiInput>();
    const categories = use<SelectCategory[]>(categoriesPromise);

    return (
        <>
            <FormLabel>
                Categoría Meeti
            </FormLabel>
            <FormSelect
                {...register('categoryId')}
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
            {errors.categoryId && <FormError>{errors.categoryId.message}</FormError>}

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
