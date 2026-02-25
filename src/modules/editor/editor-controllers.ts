'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewsAction, updateNewsAction } from './actions';
import { News } from '@/types/news';

export function useNewsEditorController(existingNews?: News) {
    const router = useRouter();

    const [title, setTitle] = useState(existingNews?.title || '');
    const [content, setContent] = useState(existingNews?.content || '');
    const [publisher, setPublisher] = useState(existingNews?.publisher || '');
    const [status, setStatus] = useState<string>(existingNews?.status || 'draft');
    const [tagsInput, setTagsInput] = useState(existingNews?.tags?.join(', ') || '');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Basic validation
        if (!title || !content || !publisher) {
            setError("Title, Content, and Publisher are required fields.");
            setIsSubmitting(false);
            return;
        }

        const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

        const newsData: Partial<News> = {
            title,
            content,
            publisher,
            status,
            tags,
            // API expects proper ISO strings or defaults
            publishedTime: existingNews?.publishedTime || new Date().toISOString(),
            lastEdittedTime: new Date().toISOString(),
            share: existingNews?.share || 0
        };

        try {
            let result;
            if (existingNews?.id) {
                result = await updateNewsAction(existingNews.id, newsData);
            } else {
                result = await createNewsAction(newsData);
            }

            if (result.success) {
                router.push('/manage');
                router.refresh();
            } else {
                setError(result.message || 'Failed to save news article');
            }
        } catch (err) {
            setError('An unexpected error occurred while saving.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        publisher,
        setPublisher,
        status,
        setStatus,
        tagsInput,
        setTagsInput,
        isSubmitting,
        error,
        handleSubmit
    };
}
