'use server';

import { createNews, updateNews, deleteNews, getNews } from '@/services/news-service';
import { cookies } from 'next/headers';
import { News } from '@/types/news';

function parseJwt(token: string) {
    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return null;
        const jsonPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export async function getManageNewsAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) throw new Error("Unauthorized");

        const payload = parseJwt(token);
        const username = payload?.username || payload?.sub;

        if (!username) throw new Error("Could not extract username from token");

        const data = await getNews(username);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}

export async function createNewsAction(newsData: Partial<News> | FormData) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) throw new Error("Unauthorized");

        const data = await createNews(newsData, token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}

export async function updateNewsAction(id: string | number, newsData: Partial<News> | FormData) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) throw new Error("Unauthorized");

        const data = await updateNews(id, newsData, token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}

export async function deleteNewsAction(id: string | number) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) throw new Error("Unauthorized");

        const data = await deleteNews(id, token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}
