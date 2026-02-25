'use server';

import { getNewsWithParams } from '@/services/news-service';

export async function getNewsAction(tags?: string, keywords?: string) {
    try {
        const params: any = {};
        if (tags) params.tags = tags;
        if (keywords) params.keywords = keywords;

        const data = await getNewsWithParams(params);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}
