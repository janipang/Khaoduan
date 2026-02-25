'use server';

import { cookies } from 'next/headers';
import { loginAuth } from '@/services/auth-service';
import { LoginCredentials } from './types';

export async function loginAction(credentials: LoginCredentials) {
    try {
        console.log('loginAction');
        const data = await loginAuth(credentials);

        if (data.token) {
            const cookieStore = await cookies();
            cookieStore.set('auth-token', data.token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            return { success: true };
        }
        const cookieStore = await cookies();
        const myToken = cookieStore.get('auth-token');

        // This will appear in your TERMINAL, not the browser console
        console.log('Full Cookie Object:', myToken);
        console.log('Raw Value:', myToken?.value);

        return { success: false, message: 'No token received from server' };
    } catch (error) {
        return { success: false, message: (error as Error).message || 'An error occurred during login' };
    }
}
