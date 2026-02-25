import NewsEditorForm from '@/modules/editor/news-editor';
import { getNewsById } from '@/services/news-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit News - Khaoduan News',
};

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
    const resolvedParams = await params;

    try {
        const existingNews = await getNewsById(resolvedParams.id);
        return <NewsEditorForm existingNews={existingNews} />;
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Article</h2>
                <p className="text-gray-600">The article you are trying to edit could not be found.</p>
            </div>
        );
    }
}
