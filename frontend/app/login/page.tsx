"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20 pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                ResearchAI
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                        <p className="text-zinc-400">Sign in to continue your research</p>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-zinc-100 text-zinc-900 font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-zinc-800" />
                        <span className="text-zinc-500 text-sm">or</span>
                        <div className="flex-1 h-px bg-zinc-800" />
                    </div>

                    {/* Additional info */}
                    <p className="text-center text-zinc-500 text-sm">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={handleGoogleSignIn}
                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        >
                            Sign up with Google
                        </button>
                    </p>
                </div>

                {/* Footer text */}
                <p className="text-center text-zinc-600 text-xs mt-6">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
