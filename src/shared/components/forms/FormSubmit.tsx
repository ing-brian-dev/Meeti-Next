import { InputHTMLAttributes } from "react";

type FormSubmitProps = InputHTMLAttributes<HTMLInputElement>


export default function FormSubmit(props: FormSubmitProps) {
    return (
        <input
            {...props}
            type="submit"
            className="bg-pink-600 w-full p-2 mt-5 uppercase font-black text-white cursor-pointer"
        />
    )
}
