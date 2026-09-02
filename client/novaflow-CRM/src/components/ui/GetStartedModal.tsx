import { LuX } from "react-icons/lu";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({
  isOpen,
  onClose,
}: GetStartedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close modal"
        >
          <LuX size={20} />
        </button>

        <div>
          <span className="text-sm font-medium text-blue-600">
            Start with NovaFlow
          </span>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Create your workspace
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Start free and bring your team, projects, and customers into one
            workspace.
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Full name
            </label>

            <input
              type="text"
              placeholder="Alex Morgan"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Work email
            </label>

            <input
              type="email"
              placeholder="alex@company.com"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Company name
            </label>

            <input
              type="text"
              placeholder="Nova Labs"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create free workspace
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          No credit card required.
        </p>
      </div>
    </div>
  );
}