import Newspaper from '@/modules/newspaper/newspaper';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'News - Khaoduan News',
    description: 'Latest Hot News from Khaoduan',
};

export default function NewsPage() {
    return <Newspaper />;
}
