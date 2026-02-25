'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';

export default function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleUnauthorized = () => {
            setIsOpen(true);
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, []);

    const handleLoginRedirect = () => {
        setIsOpen(false);
        router.push('/login');
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            isDismissable={false}
            hideCloseButton
            backdrop="blur"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-brand-400 font-sans font-bold text-xl">
                    Session Expired
                </ModalHeader>
                <ModalBody>
                    <p className="text-color-foreground">
                        Your session has expired or you are not authorized. Please log in again to continue.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onPress={handleLoginRedirect}
                        className="w-full bg-brand-300 hover:bg-brand-200 font-medium"
                    >
                        Go to Login Page
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
