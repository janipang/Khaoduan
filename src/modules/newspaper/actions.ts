'use server';

import { getNews } from '@/services/news-service';

export async function getNewsAction() {
    try {
        const data = await getNews();
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}
