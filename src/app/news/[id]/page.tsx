import NewsDetail from '@/modules/news-detail/news-detail';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
}

// Optional: Generate dynamic metadata for SEO based on the article
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;

    return {
        title: `News Article ${resolvedParams.id} - Khaoduan News`,
        // If you wanted actual SEO tags, you'd fetch the title here first.
    };
}

export default function NewsDetailPage() {
    return <NewsDetail />;
}
