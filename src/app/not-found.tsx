import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center font-sans">
            <div className="w-48 h-48 mb-8 text-[#DF6F25] relative">
                {/* 404 Illustration */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Document Base */}
                    <rect x="50" y="30" width="100" height="140" rx="4" fill="#F59D9D" fillOpacity="0.2" stroke="#F59D9D" strokeWidth="4" />
                    {/* Magnifying Glass */}
                    <circle cx="90" cy="110" r="30" fill="white" stroke="#DF6F25" strokeWidth="6" />
                    <path d="M110 130L140 160" stroke="#DF6F25" strokeWidth="8" strokeLinecap="round" />
                    {/* Question mark */}
                    <path d="M83 100C83 96.134 86.134 93 90 93C93.866 93 97 96.134 97 100C97 103 93 105 93 108" stroke="#DF6F25" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="93" cy="116" r="3" fill="#DF6F25" />
                    {/* Floating elements */}
                    <circle cx="40" cy="50" r="6" fill="#F29A6B" className="animate-bounce" style={{ animationDelay: '0ms' }} />
                    <circle cx="160" cy="80" r="4" fill="#dd2d4a" className="animate-bounce" style={{ animationDelay: '200ms' }} />
                    <circle cx="150" cy="150" r="8" fill="#787775" className="animate-bounce" style={{ animationDelay: '400ms' }} />
                </svg>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-brand-300 mb-4">
                หาหน้าไม่เจอ (404 Not Found)
            </h2>
            <p className="text-lg text-brand-500 mb-8 max-w-md">
                The page or news article you are looking for has been moved, deleted, or possibly never existed.
            </p>

            <Link
                href="/"
                className="rounded-md bg-brand-300 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
            >
                กลับสู่หน้าแรก (Return Home)
            </Link>
        </div>
    );
}
