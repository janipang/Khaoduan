'use client';

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
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-color-foreground">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-color-foreground shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-300 sm:text-sm sm:leading-6 bg-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-color-foreground">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-color-foreground shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-300 sm:text-sm sm:leading-6 bg-transparent"
                            />
                        </div>
                    </div>

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
            </div>
        </div>
    );
}
