import { Link } from "react-router-dom";
import { LuArrowLeft, LuBoxes } from "react-icons/lu";

export default function SignUpPage() {
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
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Start managing your business from one powerful workspace.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Alex Morgan"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="alex@company.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:items-center lg:justify-center">
          
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative max-w-lg px-12">
            <span className="text-sm font-medium text-blue-400">
              Built for modern teams
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
              One workspace for your entire business.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Manage customers, projects, analytics, workflows, and your team
              without switching between multiple tools.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">1,200+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Active customers
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="mt-1 text-sm text-slate-400">
                  Platform uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}