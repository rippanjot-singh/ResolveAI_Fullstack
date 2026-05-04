import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router is used
import { useAuth } from '../hooks/useAuth';
import constants from '../../../assets/constants';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground font-sans">

            {/* Left Panel: Minimal Canvas (50%) */}
            <div 
                className="hidden lg:flex lg:w-1/2 bg-surface bg-cover bg-center items-center justify-center p-12 border-r border-border"
                style={{ backgroundImage: `url(${constants.AuthPhoto})` }}
            >
            </div>

            {/* Right Panel: Form (50%) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24">
                <div className="max-w-sm w-full mx-auto space-y-8">

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
                        <p className="text-sm text-foreground/60">
                            Welcome back. Please enter your details.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded border border-border bg-transparent px-3 py-2 pr-10 text-sm outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-foreground/50 font-medium">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Google SSO Button */}
                        <button
                            type="button"
                            className="w-full rounded border border-border bg-transparent py-2.5 text-sm font-medium hover:bg-surface transition-colors flex items-center justify-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="text-center text-sm text-foreground/60">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-foreground font-medium hover:text-primary transition-colors">
                            Sign up
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Login;
