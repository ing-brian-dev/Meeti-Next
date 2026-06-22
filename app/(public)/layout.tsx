import Header from "@/src/shared/components/ui/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
                {children}
            <footer
                className="text-center py-5"
            >
                <p>Derechos Reservados Meeti {new Date().getFullYear()} &copy;</p>
            </footer>
        </>
    );
}
