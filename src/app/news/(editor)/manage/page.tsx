import ManageNews from '@/modules/editor/manage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manage News - Khaoduan News',
};

export default function ManagePage() {
    return <ManageNews />;
}
