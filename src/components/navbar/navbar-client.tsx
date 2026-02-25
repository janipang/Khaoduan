'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
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
                <NavbarItem className="flex-1 max-w-sm hidden md:flex mr-4">
                    <form
                        className="w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const keywords = formData.get('search')?.toString().trim();
                            if (keywords) {
                                window.location.href = `/?keywords=${encodeURIComponent(keywords)}`;
                            } else {
                                window.location.href = `/`;
                            }
                        }}
                    >
                        <Input
                            name="search"
                            classNames={{
                                base: "w-full",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-10 font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="Type to search..."
                            size="sm"
                            startContent={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-brand-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            }
                            type="search"
                        />
                    </form>
                </NavbarItem>
                {isLoggedIn ? (
                    <>
                        <NavbarItem className="hidden sm:flex">
                            <Button
                                as={Link}
                                href="/news/manage"
                                variant="flat"
                                className="font-semibold text-brand-400 bg-brand-100/30 hover:bg-brand-100 transition-all shadow-sm flex items-center gap-2 px-4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Manage News
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="flex items-center gap-3">

                            <span className="text-sm font-medium text-color-foreground bg-gray-100 pl-2 pr-4 py-1 rounded-full flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
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
