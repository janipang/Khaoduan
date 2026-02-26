import { News } from '@/types/news';

export async function getNews(publisher?: string): Promise<News[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    let url = `${apiUrl}/news`;
    if (publisher) {
        url += `?publisher=${encodeURIComponent(publisher)}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        console.log(response.status)
        throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data;
}

export interface NewsQueryParams {
    publisher?: string;
    tags?: string;
    keywords?: string;
    [key: string]: any; // To allow other potential parameters
}

export async function getNewsWithParams(params: NewsQueryParams = {}): Promise<News[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const url = new URL(`${apiUrl}/news`);

    // Add all defined parameters to the query string
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        console.error(`Failed to fetch news with params: ${response.status}`);
        throw new Error('Failed to fetch news');
    }

    return response.json();
}

export async function uploadFile(formData: FormData, token: string): Promise<{ filename: string }> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const response = await fetch(`${apiUrl}/file/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        if (response.status === 413) throw new Error('PAYLOAD_TOO_LARGE_413');
        throw new Error('Failed to upload file');
    }

    return response.json();
}

export async function getNewsById(id: number | string): Promise<News> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    const response = await fetch(`${apiUrl}/news/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        throw new Error(`Failed to fetch news with ID: ${id}`);
    }

    const data = await response.json();
    return data;
}

// Authenticated methods
export async function createNews(newsOrFormData: Partial<News> | FormData, token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    const isFormData = newsOrFormData instanceof FormData;

    // Depending on backend, they may expect JSON or Multipart
    const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${apiUrl}/news`, {
        method: 'POST',
        headers,
        body: isFormData ? newsOrFormData : JSON.stringify(newsOrFormData),
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        if (response.status === 413) throw new Error('PAYLOAD_TOO_LARGE_413');
        throw new Error('Failed to create news article');
    }

    return await response.json();
}

export async function updateNews(id: number | string, newsOrFormData: Partial<News> | FormData, token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    const isFormData = newsOrFormData instanceof FormData;

    const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${apiUrl}/news/${id}`, {
        method: 'PUT',
        headers,
        body: isFormData ? newsOrFormData : JSON.stringify(newsOrFormData),
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        if (response.status === 413) throw new Error('PAYLOAD_TOO_LARGE_413');
        console.log(response.status)
        throw new Error(`Failed to update news ID: ${id}`);
    }

    return await response.json();
}

export async function deleteNews(id: number | string, token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    const response = await fetch(`${apiUrl}/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED_401');
        throw new Error(`Failed to delete news ID: ${id}`);
    }

    // Sometimes DELETE returns 204 No Content
    if (response.status === 204) return { success: true };
    return await response.json();
}
