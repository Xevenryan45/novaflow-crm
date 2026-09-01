import Container from "../common/Container";
import { LuArrowRight } from "react-icons/lu";
import Reveal from "../common/Reveal";

export default function CTA() {
    return (
        <section id="get-started" className="py-24">
            <Container>
                <Reveal>
                    <div className="rounded-3xl bg-blue-600 px-6 py-16 text-center text-white md:px-12">
                        <span className="text-sm font-medium text-blue-100">
                            Get started today
                        </span>

                        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
                            Ready to simplify the way your team works?
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-blue-100">
                            Bring your team, customers, projects, and workflows together with
                            NovaFlow.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <button>
                                <a
                                    href="#pricing"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                                >
                                    Get Started
                                    <LuArrowRight size={18} />
                                </a>
                            </button>

                            <button>
                                <a
                                    href="#pricing"
                                    className="rounded-lg border border-blue-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                                >
                                    View Pricing
                                </a>
                            </button>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}