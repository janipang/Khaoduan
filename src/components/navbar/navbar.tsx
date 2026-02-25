import { cookies } from 'next/headers';
import NavbarClient from './navbar-client';

export default async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    const username = cookieStore.get('username')?.value ?? 'User';

    let isLoggedIn = false;

    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                isLoggedIn = true;
            }
        } catch (e) {
            // invalid token
        }
    }

    return <NavbarClient isLoggedIn={isLoggedIn} username={username} />;
}
