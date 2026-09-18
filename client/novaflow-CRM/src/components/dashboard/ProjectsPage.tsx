import { useEffect, useMemo, useState } from "react";

import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
  type Project,
  type ProjectStatus,
} from "../../services/projects";

import {
  fetchCustomers,
  type Customer,
} from "../../services/customers";

import {
  LuPlus,
  LuSearch,
  LuCalendarDays,
  LuX,
} from "react-icons/lu";



export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    customerId: "",
    deadline: "",
    status: "Planning" as ProjectStatus,
    progress: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [projectsData, customersData] = await Promise.all([
          fetchProjects(),
          fetchCustomers(),
        ]);

        setProjects(projectsData);
        setCustomers(customersData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load project data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    customerId: "",
    deadline: "",
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (project.customer_name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.name || !formData.deadline) return;

    try {
      setError("");

      const newProject = await createProject({
        name: formData.name,
        customerId: formData.customerId
          ? Number(formData.customerId)
          : null,
        deadline: formData.deadline,
        status: "Planning",
        progress: 0,
      });

      setProjects((prev) => [
        newProject,
        ...prev,
      ]);

      setFormData({
        name: "",
        customerId: "",
        deadline: "",
      });

      setShowModal(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create project"
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError("");

      await deleteProject(id);

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete project"
      );
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const updated = await updateProject(id, {
        status: "Completed",
        progress: 100,
      });

      setProjects((prev) =>
        prev.map((project) =>
          project.id === id ? updated : project
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update project"
      );
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);

    setEditFormData({
      name: project.name,
      customerId: project.customer_id
        ? String(project.customer_id)
        : "",
      deadline: project.deadline
        ? project.deadline.split("T")[0]
        : "",
      status: project.status,
      progress: project.progress,
    });
  };

  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!editingProject) return;

    try {
      setError("");

      const updated = await updateProject(
        editingProject.id,
        {
          name: editFormData.name,
          customerId: editFormData.customerId
            ? Number(editFormData.customerId)
            : null,
          deadline: editFormData.deadline || null,
          status: editFormData.status,
          progress: editFormData.progress,
        }
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.id === updated.id
            ? updated
            : project
        )
      );

      setEditingProject(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update project"
      );
    }
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

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="mt-8 py-16 text-center text-sm text-slate-400">
          Loading projects...
        </div>
      ) : (
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
                    {project.customer_name ?? "No client assigned"}
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
                <span>Deadline: {project.deadline ?? "No deadline"}</span>
              </div>

              <button
                type="button"
                onClick={() => handleEditClick(project)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>

              <div className="mt-4 flex items-center gap-4">
                {project.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => handleComplete(project.id)}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Mark Complete
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="text-xs font-medium text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredProjects.length === 0 && (
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

                <select
                  value={formData.customerId}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      customerId: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    No client assigned
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                    </option>
                  ))}
                </select>
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

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <LuX size={19} />
            </button>

            <h2 className="text-xl font-bold text-slate-900">
              Edit Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update project details and progress.
            </p>

            <form
              onSubmit={handleUpdateSubmit}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Project name
                </label>

                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(event) =>
                    setEditFormData({
                      ...editFormData,
                      name: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Client
                </label>

                <select
                  value={editFormData.customerId}
                  onChange={(event) =>
                    setEditFormData({
                      ...editFormData,
                      customerId: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="">
                    No client assigned
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={editFormData.status}
                  onChange={(event) =>
                    setEditFormData({
                      ...editFormData,
                      status:
                        event.target.value as ProjectStatus,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="Planning">
                    Planning
                  </option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Review">
                    Review
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Progress: {editFormData.progress}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editFormData.progress}
                  onChange={(event) =>
                    setEditFormData({
                      ...editFormData,
                      progress: Number(event.target.value),
                    })
                  }
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Deadline
                </label>

                <input
                  type="date"
                  value={editFormData.deadline}
                  onChange={(event) =>
                    setEditFormData({
                      ...editFormData,
                      deadline: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
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