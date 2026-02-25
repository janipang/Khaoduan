import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center font-sans">
            <div className="w-24 h-24 mb-6 text-brand-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-brand-300 mb-4">
                ไม่มีสิทธิ์เข้าถึง (Unauthorized)
            </h2>
            <p className="text-brand-500 mb-8 max-w-md">
                You must be logged in to access the editor space. Please sign in to continue.
            </p>

            <div className="flex gap-4">
                <Link
                    href="/login"
                    className="rounded-md bg-brand-300 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-200 transition-colors"
                >
                    Sign In
                </Link>
                <Link
                    href="/"
                    className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-brand-500 shadow-sm hover:bg-gray-200 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
