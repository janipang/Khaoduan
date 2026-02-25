'use client';

import { useParams } from 'next/navigation';
import { useNewsDetailController } from './controllers';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function NewsDetail() {
    const params = useParams();
    const idStr = Array.isArray(params.id) ? params.id[0] : params.id;

    const { news, isLoading, error } = useNewsDetailController(idStr || '');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-300"></div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <p className="text-brand-400 font-medium bg-brand-100 bg-opacity-20 inline-block px-6 py-3 rounded-md mb-6">
                    {error || 'News article not found.'}
                </p>
                <Link href="/" className="text-brand-300 hover:text-brand-400 font-medium underline">
                    &larr; Back to News
                </Link>
            </div>
        );
    }

    // Format date nicely
    const formattedDate = new Date(news.publishedTime).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12 bg-color-background min-h-screen font-sans">
            <Link
                href="/"
                className="inline-flex items-center text-sm text-brand-500 hover:text-brand-300 transition-colors mb-8 group"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                กลับไปหน้ารวมข่าว (Back to News)
            </Link>

            <header className="mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-3 mb-4">
                    {news.status === 'published' ? (
                        <span className="bg-brand-100 text-brand-400 px-3 py-1 rounded-full text-xs font-semibold">
                            เผยแพร่แล้ว (Published)
                        </span>
                    ) : (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
                            แบบร่าง (Draft)
                        </span>
                    )}

                    {(news.tags || []).map(tag => (
                        <span key={tag} className="text-xs bg-gray-50 px-2 py-1 rounded text-brand-500 border border-gray-100">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-color-foreground tracking-tight leading-tight mb-6">
                    {news.title}
                </h1>

                <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-brand-500">
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <span className="font-medium text-color-foreground">{news.publisher}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <time dateTime={news.publishedTime}>{formattedDate}</time>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                            <ShareIcon className="w-4 h-4" />
                            <span>{news.share} แชร์</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="prose prose-lg max-w-none text-color-foreground prose-headings:font-sans prose-headings:text-brand-300 prose-a:text-brand-400">
                {/* We use dangerouslySetInnerHTML here because the content might be HTML from React Quill in the future */}
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

        </article>
    );
}
