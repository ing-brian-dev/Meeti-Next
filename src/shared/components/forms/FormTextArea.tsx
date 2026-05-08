import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react'

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>


export default function FormTextArea(props: FormTextAreaProps) {
    const { className } = props;
    return (
        <textarea
            {...props}
            className={clsx('border border-slate-200 w-full p-2 h-40', className)}
        />
    )
}
