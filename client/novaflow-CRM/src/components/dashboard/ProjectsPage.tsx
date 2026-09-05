import { useMemo, useState } from "react";
import {
  LuPlus,
  LuSearch,
  LuCalendarDays,
  LuX,
} from "react-icons/lu";

type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed";

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  deadline: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Acme Inc.",
    progress: 78,
    status: "In Progress",
    deadline: "Sep 18, 2026",
  },
  {
    id: 2,
    name: "Mobile App",
    client: "Bright Labs",
    progress: 54,
    status: "In Progress",
    deadline: "Oct 04, 2026",
  },
  {
    id: 3,
    name: "CRM Migration",
    client: "Northstar",
    progress: 92,
    status: "Review",
    deadline: "Sep 12, 2026",
  },
  {
    id: 4,
    name: "Brand Strategy",
    client: "Vertex Studio",
    progress: 100,
    status: "Completed",
    deadline: "Aug 28, 2026",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    deadline: "",
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.client || !formData.deadline) return;

    const formattedDeadline = new Date(
      `${formData.deadline}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const newProject: Project = {
      id: Date.now(),
      name: formData.name,
      client: formData.client,
      progress: 0,
      status: "Planning",
      deadline: formattedDeadline,
    };

    setProjects((prev) => [newProject, ...prev]);

    setFormData({
      name: "",
      client: "",
      deadline: "",
    });

    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Projects</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Project Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track progress, deadlines, and active work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <LuPlus size={18} />
          New Project
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <LuSearch
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  {project.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {project.client}
                </p>
              </div>

              <StatusBadge status={project.status} />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Progress
                </span>

                <span className="text-xs font-semibold text-slate-700">
                  {project.progress}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <LuCalendarDays size={15} />

              <span>Deadline: {project.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-medium text-slate-700">
            No projects found
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or status filter.
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <LuX size={19} />
            </button>

            <h2 className="text-xl font-bold text-slate-900">
              Create Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new project to your workspace.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Project name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  placeholder="Website Redesign"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Client
                </label>

                <input
                  type="text"
                  value={formData.client}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      client: event.target.value,
                    })
                  }
                  placeholder="Acme Inc."
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Deadline
                </label>

                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      deadline: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const styles: Record<ProjectStatus, string> = {
    Planning: "bg-slate-100 text-slate-600",
    "In Progress": "bg-blue-50 text-blue-600",
    Review: "bg-amber-50 text-amber-600",
    Completed: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}