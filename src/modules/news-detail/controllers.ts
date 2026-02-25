'use client';

import { useState, useEffect } from 'react';
import { getNewsDetailAction } from './actions';
import { News } from '@/types/news';

export function useNewsDetailController(newsId: string | number) {
    const [news, setNews] = useState<News | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchNewsDetail() {
            try {
                const result = await getNewsDetailAction(newsId);
                if (!mounted) return;

                if (result.success && result.data) {
                    setNews(result.data);
                } else {
                    setError(result.message || 'Failed to fetch news details');
                }
            } catch (err) {
                if (mounted) setError('An unexpected error occurred');
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        if (newsId) {
            fetchNewsDetail();
        }

        return () => {
            mounted = false;
        };
    }, [newsId]);

    return {
        news,
        isLoading,
        error,
    };
}
