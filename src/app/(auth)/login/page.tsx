import Login from '@/modules/login/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - Khaoduan News',
    description: 'Sign in to access news editor features',
};

export default function LoginPage() {
    return <Login />;
}
