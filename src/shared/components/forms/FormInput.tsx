import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>


export function FormInput(props: FormInputProps) {

    const { className } = props;

    return (
        <input
            {...props}
            className={clsx('border border-slate-200 w-full p-2', className)}
        />
    )
}
