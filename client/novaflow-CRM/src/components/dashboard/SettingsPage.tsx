import { useState } from "react";
import {
  LuUserRound,
  LuBuilding2,
  LuBell,
  LuShieldCheck,
  LuSave,
} from "react-icons/lu";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex@novaflow.com",
    role: "Administrator",
  });

  const [workspace, setWorkspace] = useState({
    name: "NovaFlow Business",
    timezone: "Africa/Lagos",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    projectUpdates: true,
    customerUpdates: false,
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleWorkspaceSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-blue-600">
          Settings
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Workspace Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your profile, workspace preferences, notifications, and security.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[240px_1fr]">
        {/* settings nav */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <SettingsLink
            icon={LuUserRound}
            label="Profile"
            active
          />

          <SettingsLink
            icon={LuBuilding2}
            label="Workspace"
          />

          <SettingsLink
            icon={LuBell}
            label="Notifications"
          />

          <SettingsLink
            icon={LuShieldCheck}
            label="Security"
          />
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LuUserRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Profile Information
                </h2>

                <p className="text-sm text-slate-500">
                  Update your personal account details.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Role
                </label>

                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <LuSave size={17} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Workspace */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LuBuilding2 size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Workspace
                </h2>

                <p className="text-sm text-slate-500">
                  Manage your workspace configuration.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleWorkspaceSave}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Workspace name
                </label>

                <input
                  type="text"
                  value={workspace.name}
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Timezone
                </label>

                <select
                  value={workspace.timezone}
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,
                      timezone: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="Africa/Lagos">
                    Africa/Lagos
                  </option>
                  <option value="Europe/London">
                    Europe/London
                  </option>
                  <option value="America/New_York">
                    America/New_York
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <LuSave size={17} />
                  Save Workspace
                </button>
              </div>
            </form>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LuBell size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Notifications
                </h2>

                <p className="text-sm text-slate-500">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              <ToggleSetting
                title="Email notifications"
                description="Receive important account notifications by email."
                enabled={notifications.email}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }
              />

              <ToggleSetting
                title="Project updates"
                description="Receive updates when project activity changes."
                enabled={notifications.projectUpdates}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    projectUpdates: !prev.projectUpdates,
                  }))
                }
              />

              <ToggleSetting
                title="Customer updates"
                description="Receive alerts when customer information changes."
                enabled={notifications.customerUpdates}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    customerUpdates: !prev.customerUpdates,
                  }))
                }
              />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LuShieldCheck size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Security
                </h2>

                <p className="text-sm text-slate-500">
                  Manage your password and account security.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Current password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div />

              <div>
                <label className="text-sm font-medium text-slate-700">
                  New password
                </label>

                <input
                  type="password"
                  placeholder="New password"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Confirm password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Update Password
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

interface SettingsLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

function SettingsLink({
  icon: Icon,
  label,
  active = false,
}: SettingsLinkProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

interface ToggleSettingProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

function ToggleSetting({
  title,
  description,
  enabled,
  onChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}