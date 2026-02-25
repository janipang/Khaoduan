'use client';

import NewsCard from '@/components/news-card/news-card';
import { useNewspaperController } from './controllers';

export default function Newspaper() {
    const { newsList, isLoading, error, tags, keywords } = useNewspaperController();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-300"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center">
                <p className="text-brand-400 font-medium bg-brand-100 bg-opacity-20 inline-block px-6 py-3 rounded-md">
                    {error}
                </p>
            </div>
        );
    }

    // Filter or highlight hot news if necessary, or just display vertically
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-color-background min-h-screen">
            <div className="flex items-center gap-4 border-b-4 border-brand-300 pb-2 mb-8 inline-flex flex-wrap">
                <h1 className="text-3xl font-extrabold font-sans text-color-foreground tracking-tight whitespace-nowrap">
                    {(tags || keywords) ? 'Search Results' : 'Hot News'}
                </h1>
                {tags && (
                    <span className="bg-brand-100 text-brand-400 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        #{tags}
                    </span>
                )}
                {keywords && (
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm border border-gray-200">
                        "{keywords}"
                    </span>
                )}
            </div>

            {newsList.length === 0 ? (
                <p className="text-brand-500 text-center py-10">No news articles available at the moment.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {newsList.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>
            )}
        </div>
    );
}
