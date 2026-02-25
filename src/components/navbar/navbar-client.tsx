'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarClientProps {
    isLoggedIn: boolean;
    username: string;
}

export default function NavbarClient({ isLoggedIn, username }: NavbarClientProps) {
    const pathname = usePathname();

    // Don't show regular navbar on auth pages if desired, but for now we show it everywhere

    return (
        <Navbar maxWidth="xl" isBordered className="bg-color-background/80 backdrop-blur-md">
            <NavbarBrand>
                <Link href="/" className="font-bold text-inherit">
                    <p className="font-sans font-black text-2xl bg-gradient-to-r from-brand-300 to-brand-400 bg-clip-text text-transparent">
                        KhaoDuan
                    </p>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="end">
                {isLoggedIn ? (
                    <>
                        <NavbarItem className="hidden sm:flex">
                            <Link href="/news/manage" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
                                Manage News
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="flex items-center gap-3">

                            <span className="text-sm font-medium text-color-foreground bg-gray-100 pl-2 pr-4 py-1 rounded-full flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                                </svg>{username}</span>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="primary"
                            href="/login"
                            variant="flat"
                            className="font-medium text-brand-300 bg-brand-100/50 hover:bg-brand-100 transition-colors"
                        >
                            Login
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar >
    );
}
