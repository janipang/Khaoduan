'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewsAction, updateNewsAction } from './actions';
import { News } from '@/types/news';

export function useNewsEditorController(existingNews?: News, username?: string) {
    const router = useRouter();

    const [title, setTitle] = useState(existingNews?.title || '');
    const [content, setContent] = useState(existingNews?.content || '');
    const publisher = existingNews?.publisher || username || '';
    const [status, setStatus] = useState<string>(existingNews?.status || 'draft');
    const [tagsInput, setTagsInput] = useState(existingNews?.tags?.join(', ') || '');
    const [keywords, setKeywords] = useState<string[]>(existingNews?.keywords || []);
    const [keywordInput, setKeywordInput] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddKeyword = () => {
        if (keywordInput.trim() && keywords.length < 7 && !keywords.includes(keywordInput.trim())) {
            setKeywords([...keywords, keywordInput.trim()]);
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(k => k !== keywordToRemove));
    };

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
            keywords,
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
                router.push('/news/manage');
            } else {
                if (result.message === 'UNAUTHORIZED_401') window.dispatchEvent(new Event('auth:unauthorized'));
                else setError(result.message || 'Failed to save news article');
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
        status,
        setStatus,
        tagsInput,
        setTagsInput,
        keywords,
        keywordInput,
        setKeywordInput,
        handleAddKeyword,
        handleRemoveKeyword,
        isSubmitting,
        error,
        handleSubmit
    };
}
