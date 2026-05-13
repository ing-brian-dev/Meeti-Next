import { Form, FormError, FormInput, FormLabel } from "@/src/shared/components/forms";
import { useCommunityStore } from "../store/community.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckPasswordInput, CheckPasswordSchema } from "../../auth/schemas/authSchema";
import { deleteCommunityAction } from "../actions/community-actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function DeleteCommunityForm() {

    const { setOpen, setCommunity, community } = useCommunityStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CheckPasswordSchema),
        mode: 'all'
    });

    const onSubmit = async (data: CheckPasswordInput) => {
        if (!community) return;
        const { error, success } = await deleteCommunityAction(data, community.id);

        if (error) { toast.error(error) }
        if(success) {
            toast.success(success);
            setOpen(false);
            setCommunity(null);
            setTimeout(() => {
                redirect('/dashboard/communities');
            }, 1000);
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel
                className="text-white"
            >
                Confirma con tu Password
            </FormLabel>
            <FormInput
                type='password'
                {...register('password')}
            />
            {errors.password?.message && <FormError>{errors.password.message}</FormError>}
            <input
                type='submit'
                value="Eliminar Comunidad"
                className="inline-flex w-full cursor-pointer justify-center  bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto dark:bg-red-500 dark:hover:bg-red-400"
            />

            <button
                type="button"
                data-autofocus
                onClick={() => {
                    setOpen(false);
                    setCommunity(null);
                }}
                className="mt-3 inline-flex w-full justify-center cursor-pointer  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto dark:bg-white/10 dark:text-white dark:inset-ring-white/5 dark:hover:bg-white/20"
            >
                Cancelar
            </button>
        </Form>
    )
}