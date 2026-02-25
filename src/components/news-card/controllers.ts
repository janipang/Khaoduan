'use client';

import { useRouter } from 'next/navigation';

export function useNewsCardController(newsId: number) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/news/${newsId}`);
    };

    return {
        handleCardClick,
    };
}
