export type News = {
    id: number;
    title: string;
    content: string;
    publisher: string;
    status: string;
    publishedTime: string;
    lastEdittedTime: string;
    keywords?: string[];
    tags?: string[];
    share: number;
}