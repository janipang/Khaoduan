'use client';

import { useState, useEffect } from 'react';
import { getNewsAction } from './actions';
import { News } from '@/types/news';

import { useSearchParams } from 'next/navigation';

export function useNewspaperController() {
    const searchParams = useSearchParams();
    const tags = searchParams.get('tags') || undefined;
    const keywords = searchParams.get('keywords') || undefined;

    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Re-fetch when tags or keywords change
    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        async function fetchNews() {
            try {
                const result = await getNewsAction(tags, keywords);
                if (!mounted) return;

                if (result.success && result.data) {
                    setNewsList(result.data);
                } else {
                    setError(result.message || 'Failed to fetch news');
                }
            } catch (err) {
                if (mounted) setError('An unexpected error occurred while fetching news');
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        fetchNews();

        return () => {
            mounted = false;
        };
    }, [tags, keywords]);

    return {
        newsList,
        isLoading,
        error,
        tags, // Optional, can use it in UI to show "Showing results for: #tag"
        keywords,
    };
}
