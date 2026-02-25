import NewsEditorForm from '@/modules/editor/news-editor';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create News - Khaoduan News',
};

export default function CreateNewsPage() {
    return <NewsEditorForm />;
}
