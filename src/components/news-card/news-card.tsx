'use client';

import { News } from '@/types/news';
import { useNewsCardController } from './controllers';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from 'next/link';

import 'react-quill-new/dist/quill.snow.css';

interface NewsCardProps {
    news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
    const { handleCardClick } = useNewsCardController(news.id);

    return (
        <Card
            isPressable
            onPress={handleCardClick}
            className="w-full bg-color-background border border-gray-100 hover:border-brand-100 shadow-sm hover:shadow-md transition-all group"
        >
            <CardHeader className="flex gap-3 px-5 pt-5 pb-0 justify-between items-start">
                <h3 className="text-xl font-bold font-sans text-brand-300 group-hover:text-brand-400 transition-colors line-clamp-2 text-left">
                    {news.title}
                </h3>
                {news.status === 'published' && (
                    <Chip size="sm" color="danger" variant="flat" className="text-brand-400 bg-brand-100/50">
                        Hot
                    </Chip>
                )}
            </CardHeader>

            <CardBody className="px-5 py-3">
                <div className="ql-snow">
                    <div
                        className="ql-editor !p-0 text-foreground/80 text-sm 
                   line-clamp-3 !overflow-hidden !display-[-webkit-box]
                   [&_*]:inline"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </CardBody>

            <CardFooter className="px-5 pb-5 pt-0 flex-col items-start gap-4">
                <div className="flex justify-between items-center w-full text-xs text-brand-500">
                    <span className="font-medium">By {news.publisher}</span>
                    <span>{new Date(news.publishedTime).toLocaleDateString('en-GB', {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}</span>
                </div>

                {(news.tags && news.tags.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                        {news.tags.map(tag => (
                            <Link key={tag} href={`/?tags=${encodeURIComponent(tag)}`} onClick={(e) => e.stopPropagation()}>
                                <Chip size="sm" variant="faded" className="text-brand-500 border-gray-200 hover:bg-gray-100 cursor-pointer">
                                    #{tag}
                                </Chip>
                            </Link>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
