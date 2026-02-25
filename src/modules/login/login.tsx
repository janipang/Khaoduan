'use client';

import { Input } from '@heroui/input';
import { useLoginController } from './controllers';

export default function Login() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit
    } = useLoginController();

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-color-background">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-3xl font-bold font-sans tracking-tight text-brand-300">
                    Sign in to Khaoduan
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        value={username}
                        fullWidth
                        isRequired
                        label="Username"
                        onValueChange={setUsername}
                        variant='bordered'
                    />

                    <Input
                        id="password"
                        type='password'
                        value={password}
                        fullWidth
                        isRequired
                        label="password"
                        onValueChange={setPassword}
                        variant='bordered'
                    />

                    {error && (
                        <div className="text-brand-400 text-sm font-medium p-3 bg-brand-100 bg-opacity-20 rounded-md">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-brand-300 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/register" className="font-semibold leading-6 text-brand-300 hover:text-brand-200">
                        Register now
                    </a>
                </p>
            </div>
        </div>
    );
}
