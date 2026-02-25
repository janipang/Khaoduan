'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center font-sans">
            <div className="w-40 h-40 mb-8 text-[#dd2d4a]">
                {/* Broken link / Error illustration */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full animate-pulse">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="rgba(221, 45, 74, 0.1)" />
                    <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" />
                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
                </svg>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-brand-400 mb-4">
                เกิดข้อผิดพลาด!
            </h2>
            <p className="text-lg text-brand-500 mb-8 max-w-md">
                Something went wrong while processing your request. Don't worry, it's not your fault.
            </p>

            <button
                onClick={() => reset()}
                className="rounded-md bg-brand-300 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
            >
                Lòng lǒng ìk kráng (Try again)
            </button>
        </div>
    );
}
