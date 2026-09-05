import { Link } from "react-router-dom";
import { LuArrowLeft, LuBoxes } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in."
            );
        }
    };
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Side */}
                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            <LuArrowLeft size={16} />
                            Back to home
                        </Link>

                        <div className="mt-10">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                    <LuBoxes size={21} />
                                </div>

                                <span className="text-xl font-bold text-slate-900">
                                    NovaFlow
                                </span>
                            </div>

                            <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">
                                Welcome back
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Sign in to continue to your NovaFlow workspace.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    placeholder="alex@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300"
                                />

                                <label
                                    htmlFor="remember"
                                    className="text-sm text-slate-600"
                                >
                                    Remember me
                                </label>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:items-center lg:justify-center">
                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

                    <div className="relative max-w-lg px-12">
                        <span className="text-sm font-medium text-blue-400">
                            Your workspace awaits
                        </span>

                        <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
                            Pick up right where your team left off.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-400">
                            Access your customers, projects, analytics, and workflows from
                            one secure workspace.
                        </p>

                        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                            <p className="text-sm leading-6 text-slate-300">
                                “NovaFlow gives our entire team one clear view of what matters
                                every single day.”
                            </p>

                            <div className="mt-5">
                                <p className="text-sm font-semibold text-white">
                                    Jordan Lee
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Operations Director
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}