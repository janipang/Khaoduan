import { LoginCredentials, LoginResponse } from '@/modules/login/types';

export async function loginAuth(credentials: LoginCredentials): Promise<LoginResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000/api';

    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        console.log(response.status)
        throw new Error('Invalid credentials or login failed');
    }

    const data = await response.json();
    return data;
}
