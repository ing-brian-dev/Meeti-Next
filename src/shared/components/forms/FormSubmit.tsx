import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type FormSubmitProps = InputHTMLAttributes<HTMLInputElement>


export function FormSubmit(props: FormSubmitProps) {
    const { className } = props;
    return (
        <input
            {...props}
            type="submit"
            className={clsx('bg-pink-600 w-full p-2 mt-5 uppercase font-black text-white cursor-pointer', className)}
        />
    )
}
