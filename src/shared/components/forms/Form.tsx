import type { FormHTMLAttributes } from "react";
import clsx from "clsx";

type FormProps = FormHTMLAttributes<HTMLFormElement>

export default function Form(props: FormProps) {

    const { className, children } = props;
    
    return (
        <form
            {...props}
            className={clsx('mt-10 space-y-3', className)}
        >
            {children}
        </form>
    )
}
