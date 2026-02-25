'use client';

import { useManageNewsController } from './controllers';
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ManageNews() {
    const {
        newsList,
        isLoading,
        error,
        isDeleting,
        handleDelete,
        handleEdit,
        handleCreateNew
    } = useManageNewsController();

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 bg-color-background min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold font-sans text-color-foreground tracking-tight">
                    Manage News
                </h1>
                <Button
                    color="primary"
                    onPress={handleCreateNew}
                    className="bg-brand-300 text-white font-medium"
                    startContent={<PlusIcon className="w-5 h-5" />}
                >
                    Create News
                </Button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-300"></div>
                </div>
            ) : newsList.length === 0 ? (
                <Card className="p-8 text-center bg-gray-50 shadow-none border border-gray-100">
                    <p className="text-brand-500 mb-4">You haven't written any news articles yet.</p>
                    <Button onPress={handleCreateNew} color="primary" variant="flat" className="text-brand-300 bg-brand-100/30 w-max mx-auto">
                        Write your first article
                    </Button>
                </Card>
            ) : (
                <div className="flex flex-col gap-4">
                    {newsList.map((news) => (
                        <Card key={news.id} className="w-full border border-gray-100 shadow-sm hover:border-brand-200 transition-colors">
                            <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {news.status === 'published' ? (
                                            <Chip size="sm" color="success" variant="flat" className="text-brand-300 bg-brand-100/20">Published</Chip>
                                        ) : (
                                            <Chip size="sm" variant="flat" className="bg-gray-100 text-gray-500">Draft</Chip>
                                        )}
                                        <span className="text-xs text-brand-500">
                                            {new Date(news.publishedTime).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold font-sans text-color-foreground truncate">
                                        {news.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="default"
                                        onPress={() => handleEdit(news.id)}
                                        aria-label="Edit news"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 text-gray-600" />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="danger"
                                        onPress={() => handleDelete(news.id)}
                                        isLoading={isDeleting === news.id}
                                        aria-label="Delete news"
                                    >
                                        <TrashIcon className="w-5 h-5 text-red-500" />
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
