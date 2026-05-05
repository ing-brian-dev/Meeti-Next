import Header from "@/src/shared/components/ui/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}
