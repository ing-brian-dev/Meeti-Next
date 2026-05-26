"use client"

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
    return (
        <>
            <h2>Hubo un error</h2>
            <p>{error.message}</p>
        </>
    )

}