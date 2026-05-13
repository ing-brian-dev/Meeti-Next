import Link from "next/link";
import Logo from "./Logo";
import GuestNavigation from "./GuestNavigation";
import { requireAuth } from "@/src/lib/auth-server";
import UserNavigation from "./UserNavigation";

export default async function Header() {
    const { isAuth } = await requireAuth();
    return (
        <header className="border-b border-gray-200">
            <div className="md:flex md:justify-between md:items-center max-w-7xl mx-auto p-5 lg:px-0">
                <div className="flex justify-center py-10 md:py-0">
                    <Link href='/'>
                        <div className="w-32">
                            <Logo />
                        </div>
                    </Link>
                </div>
                {isAuth ? (
                    <UserNavigation />
                ) : (
                    <GuestNavigation />
                )}
            </div>
        </header>
    )
}
