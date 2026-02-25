'use client';

// Dynamically import React Quill to prevent SSR window is not defined errors
import dynamic from 'next/dynamic';
import { useNewsEditorController } from './editor-controllers';
import { uploadFileAction } from './actions';
import { News } from '@/types/news';
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import 'react-quill-new/dist/quill.snow.css'; // Import Quill CSS

import { useRef, useMemo } from 'react';

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        return function ForwardedQuill(props: any) {
            return <RQ ref={props.forwardedRef} {...props} />;
        };
    },
    { ssr: false, loading: () => <p className="text-gray-400 p-4">Loading editor...</p> }
);

interface NewsEditorProps {
    existingNews?: News;
    username: string;
}

export default function NewsEditorForm({ existingNews, username }: NewsEditorProps) {
    const {
        title,
        setTitle,
        content,
        setContent,
        publisher,
        status,
        setStatus,
        tagsInput,
        setTagsInput,
        isSubmitting,
        error,
        handleSubmit
    } = useNewsEditorController(existingNews, username);

    const quillRef = useRef<any>(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const res = await uploadFileAction(formData);
                    if (res.success && res.data) {
                        const url = res.data.path;
                        if (url) {
                            const quill = quillRef.current?.getEditor();
                            if (quill) {
                                const range = quill.getSelection(true);
                                quill.insertEmbed(range.index, 'image', url);
                            }
                        } else {
                            alert('Upload successful but no image URL was returned.');
                        }
                    } else {
                        if (res.message === 'UNAUTHORIZED_401') window.dispatchEvent(new Event('auth:unauthorized'));
                        else alert('Upload failed: ' + res.message);
                    }
                } catch (e) {
                    alert('Upload failed');
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const isEditing = !!existingNews;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
            <Card className="shadow-md border border-gray-100 bg-color-background overflow-visible">
                <form onSubmit={handleSubmit}>
                    <CardHeader className="px-6 py-4 border-b border-gray-100">
                        <h1 className="text-2xl font-bold font-sans text-brand-300">
                            {isEditing ? 'Edit News Article' : 'Create News Article'}
                        </h1>
                    </CardHeader>

                    <CardBody className="px-6 py-6 flex flex-col gap-6 overflow-visible">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}

                        <Input
                            fullWidth
                            isRequired
                            label="Article Title"
                            placeholder=" "
                            value={title}
                            onValueChange={setTitle}
                            classNames={{
                                label: "text-color-foreground font-medium",
                                input: "text-lg"
                            }}
                        />

                        <div className="flex flex-col sm:flex-row gap-6 w-full">
                            <Input
                                fullWidth
                                isRequired
                                isReadOnly
                                label="Publisher Name"
                                value={publisher}
                                classNames={{ label: "text-color-foreground font-medium", input: "text-gray-500 cursor-not-allowed" }}
                            />

                            <Input
                                fullWidth
                                label="Tags (Comma Separated)"
                                placeholder="politics, technology, global"
                                value={tagsInput}
                                onValueChange={setTagsInput}
                                classNames={{ label: "text-color-foreground font-medium" }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-color-foreground">
                                Article Status
                            </label>
                            <RadioGroup
                                orientation="horizontal"
                                value={status}
                                onValueChange={setStatus}
                                className="gap-4"
                            >
                                <Radio value="draft" color="default">Draft (Not Visible)</Radio>
                                <Radio value="published" color="danger">Published (Live to Public)</Radio>
                            </RadioGroup>
                        </div>

                        <div className="flex flex-col gap-2 relative z-0">
                            <label className="text-sm font-medium text-color-foreground">
                                News Content <span className="text-red-500">*</span>
                            </label>
                            <div className="bg-white rounded-md border border-gray-200">
                                <ReactQuill
                                    forwardedRef={quillRef}
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    formats={formats}
                                    className="h-64 sm:h-96"
                                />
                            </div>
                        </div>
                        {/* 
              React Quill needs some space below so the editor box doesn't overlap the footer
              since the toolbar and inner containers use absolute/relative logic sometimes 
            */}
                        <div className="h-12 sm:h-6 hidden sm:block"></div>
                    </CardBody>

                    <CardFooter className="px-6 py-4 border-t border-gray-100 justify-end gap-3 flex-wrap">
                        <Button
                            variant="flat"
                            color="default"
                            type="button"
                            onPress={() => window.history.back()}
                            className="font-medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            isLoading={isSubmitting}
                            className="bg-brand-300 text-white font-medium px-8"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Article'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
