'use client';

import { useState, useEffect } from 'react';
import { getManageNewsAction, deleteNewsAction } from './actions';
import { News } from '@/types/news';
import { useRouter } from 'next/navigation';

export function useManageNewsController() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        setIsLoading(true);
        try {
            const result = await getManageNewsAction();
            if (result.success && result.data) {
                setNewsList(result.data);
            } else {
                if (result.message === 'UNAUTHORIZED_401') window.dispatchEvent(new Event('auth:unauthorized'));
                else setError(result.message || 'Failed to load news');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this news article?')) return;

        setIsDeleting(id);
        try {
            const result = await deleteNewsAction(id);
            if (result.success) {
                // Refresh list
                setNewsList(prev => prev.filter(n => n.id !== id));
            } else {
                if (result.message === 'UNAUTHORIZED_401') window.dispatchEvent(new Event('auth:unauthorized'));
                else alert(result.message || 'Failed to delete news');
            }
        } catch (err) {
            alert('An unexpected error occurred while deleting');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleEdit = (id: number) => {
        router.push(`/news/edit/${id}`);
    };

    const handleCreateNew = () => {
        router.push('/news/create');
    };

    return {
        newsList,
        isLoading,
        error,
        isDeleting,
        handleDelete,
        handleEdit,
        handleCreateNew
    };
}
