'use client';

import { useState, useEffect } from 'react';
import { getNewsAction } from './actions';
import { News } from '@/types/news';

export function useNewspaperController() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchNews() {
            try {
                const result = await getNewsAction();
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
    }, []);

    return {
        newsList,
        isLoading,
        error,
    };
}
