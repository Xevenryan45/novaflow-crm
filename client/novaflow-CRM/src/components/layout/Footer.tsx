import Container from "../common/Container";
import { LuBoxes, LuGithub, LuTwitter, LuLinkedin } from "react-icons/lu";

const footerLinks = {
  Product: ["Features", "Pricing", "Testimonials", "FAQ"],
  Company: ["About", "Contact", "Careers"],
  Legal: ["Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <LuBoxes size={20} />
              </div>

              <span className="text-xl font-bold">NovaFlow</span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              A simple workspace for modern teams to manage customers,
              projects, workflows, and business insights.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white"
              >
                <LuGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white"
              >
                <LuTwitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white"
              >
                <LuLinkedin size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NovaFlow. All rights reserved.</p>

          <p>Built for modern teams.</p>
        </div>
      </Container>
    </footer>
  );
}