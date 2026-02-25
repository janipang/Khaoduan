export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center font-sans">
            <div className="relative w-24 h-24 mb-6">
                {/* Outer Ring */}
                <svg className="absolute top-0 left-0 w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '3s' }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F59D9D" strokeWidth="6" strokeDasharray="150" strokeDashoffset="50" strokeLinecap="round" />
                </svg>
                {/* Inner Ring */}
                <svg className="absolute top-0 left-0 w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDirection: 'reverse', animationDuration: '2s' }}>
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#F29A6B" strokeWidth="6" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
                </svg>
                {/* Core Ring */}
                <svg className="absolute top-0 left-0 w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '1.5s' }}>
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#DF6F25" strokeWidth="6" strokeDasharray="50" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-brand-300">
                กำลังโหลดข้อมูล...
            </h2>
            <p className="mt-2 text-brand-500">
                Loading content, please wait.
            </p>
        </div>
    );
}
