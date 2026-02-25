import { cookies } from 'next/headers';
import NavbarClient from './navbar-client';

export default async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    let isLoggedIn = false;
    let username = '';

    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const jsonPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
                const payload = JSON.parse(jsonPayload);
                username = payload?.username || payload?.sub || 'User';
                isLoggedIn = true;
            }
        } catch (e) {
            // invalid token
        }
    }

    return <NavbarClient isLoggedIn={isLoggedIn} username={username} />;
}
