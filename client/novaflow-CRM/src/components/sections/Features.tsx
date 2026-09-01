import Container from "../common/Container";
import {
  LuUsers,
  LuUserRound,
  LuChartNoAxesColumn,
  LuFolderKanban,
  LuWorkflow,
  LuShieldCheck,
} from "react-icons/lu";
import Reveal from "../common/Reveal";

const features = [
  {
    title: "Team Collaboration",
    description:
      "Keep your team aligned with shared workflows, tasks, and communication.",
    icon: LuUsers,
  },
  {
    title: "Customer Management",
    description:
      "Manage customer relationships, activity, and important information in one place.",
    icon: LuUserRound,
  },
  {
    title: "Business Analytics",
    description:
      "Understand your business with clear insights, metrics, and performance data.",
    icon: LuChartNoAxesColumn,
  },
  {
    title: "Project Tracking",
    description:
      "Track projects, deadlines, progress, and team responsibilities with ease.",
    icon: LuFolderKanban,
  },
  {
    title: "Smart Workflows",
    description:
      "Build simple workflows that help your team spend less time on repetitive work.",
    icon: LuWorkflow,
  },
  {
    title: "Secure Workspace",
    description:
      "Keep your business information organized and protected in one central workspace.",
    icon: LuShieldCheck,
  },
];


export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-medium text-blue-600">
              Everything you need
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              One workspace. Everything connected.
            </h2>

            <p className="mt-4 text-slate-600">
              NovaFlow brings your team, customers, projects, and business
              insights together in one simple workspace.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <feature.icon
                    size={22}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}