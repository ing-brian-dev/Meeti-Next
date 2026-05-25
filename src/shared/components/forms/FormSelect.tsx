import clsx from 'clsx';
import { SelectHTMLAttributes } from 'react'

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function FormSelect(props: FormSelectProps) {
    return (
        <select
            {...props}
            className={clsx('border border-slate-200 w-full p-2 ', props.className)}
        >
            {props.children}
        </select>
    )
}
