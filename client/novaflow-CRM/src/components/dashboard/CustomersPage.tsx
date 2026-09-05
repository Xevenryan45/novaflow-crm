import { useMemo, useState } from "react";
import {
  LuPlus,
  LuSearch,
  LuX,
} from "react-icons/lu";

const initialCustomers = [
  {
    id: 1,
    name: "Acme Inc.",
    email: "team@acme.com",
    plan: "Business",
    status: "Active",
  },
  {
    id: 2,
    name: "Bright Labs",
    email: "hello@brightlabs.io",
    plan: "Professional",
    status: "Active",
  },
  {
    id: 3,
    name: "Northstar",
    email: "ops@northstar.com",
    plan: "Starter",
    status: "Trial",
  },
  {
    id: 4,
    name: "Vertex Studio",
    email: "team@vertex.com",
    plan: "Professional",
    status: "Inactive",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "Starter",
  });

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.name || !formData.email) return;

    setCustomers((prev) => [
      {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        plan: formData.plan,
        status: "Active",
      },
      ...prev,
    ]);

    setFormData({
      name: "",
      email: "",
      plan: "Starter",
    });

    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Customers
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Customer Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your customers and account details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <LuPlus size={18} />
          Add Customer
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <LuSearch
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              type="text"
              placeholder="Search customers..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">
                  Customer
                </th>
                <th className="px-6 py-3 font-medium">
                  Plan
                </th>
                <th className="px-6 py-3 font-medium">
                  Status
                </th>
                <th className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {customer.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {customer.email}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {customer.plan}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={customer.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="text-sm font-medium text-slate-700">
              No customers found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filter.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <p className="text-xs text-slate-500">
            Showing {filteredCustomers.length} of{" "}
            {customers.length} customers
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500"
            >
              Previous
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800"
            >
              <LuX size={19} />
            </button>

            <h2 className="text-xl font-bold text-slate-900">
              Add Customer
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new customer to your workspace.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Customer name
                </label>

                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Acme Inc."
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  placeholder="team@company.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Plan
                </label>

                <select
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      plan: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option>Starter</option>
                  <option>Professional</option>
                  <option>Business</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Add Customer
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
  status: string;
}) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600",
    Trial: "bg-amber-50 text-amber-600",
    Inactive: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] ??
        "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}