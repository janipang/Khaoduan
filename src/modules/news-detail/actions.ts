'use server';

import { getNewsById } from '@/services/news-service';

export async function getNewsDetailAction(id: number | string) {
    try {
        const data = await getNewsById(id);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}
