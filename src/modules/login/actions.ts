'use server';

import { cookies } from 'next/headers';
import { loginAuth, registerAuth } from '@/services/auth-service';
import { LoginCredentials } from './types';

export async function loginAction(credentials: LoginCredentials) {
    try {
        const data = await loginAuth(credentials);

        // Ensure we use the keys returned by your .NET API (accesstoken and username)
        if (data.token || data.username) {
            const cookieStore = await cookies();

            cookieStore.set('auth-token', data.token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 3 // 3 hours
            });

            cookieStore.set('username', data.username, {
                path: '/',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 3
            });

            return { success: true };
        }

        return { success: false, message: 'No credentials received from server' };

    } catch (error) {
        return { success: false, message: (error as Error).message || 'An error occurred during login' };
    }
}

export async function registerAction(credentials: LoginCredentials) {
    try {
        const data = await registerAuth(credentials);

        if (data.token || data.username) {
            const cookieStore = await cookies();

            cookieStore.set('auth-token', data.token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 3 // 3 hours
            });

            cookieStore.set('username', data.username, {
                path: '/',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 3
            });

            return { success: true };
        }

        return { success: false, message: 'No credentials received from server' };

    } catch (error) {
        return { success: false, message: (error as Error).message || 'An error occurred during registration' };
    }
}
