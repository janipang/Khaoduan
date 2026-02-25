import NewsEditorForm from '@/modules/editor/news-editor';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Create News - Khaoduan News',
};

export default async function CreateNewsPage() {
    const cookieStore = await cookies();
    const username = cookieStore.get('username')?.value || '';

    return <NewsEditorForm username={username} />;
}
