import Register from '@/modules/register/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register - Khaoduan News',
    description: 'Create an account to access news editor features',
};

export default function RegisterPage() {
    return <Register />;
}
