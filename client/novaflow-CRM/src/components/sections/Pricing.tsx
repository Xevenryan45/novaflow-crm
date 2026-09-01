import Container from "../common/Container";
import Reveal from "../common/Reveal";

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "For individuals getting started with NovaFlow.",
        features: [
            "Up to 3 team members",
            "Basic analytics",
            "Project tracking",
            "Customer management",
        ],
    },
    {
        name: "Professional",
        price: "$29",
        description: "For growing teams that need more power.",
        features: [
            "Unlimited team members",
            "Advanced analytics",
            "Smart workflows",
            "Priority support",
        ],
        popular: true,
    },
    {
        name: "Business",
        price: "$79",
        description: "For organizations managing complex workflows.",
        features: [
            "Everything in Professional",
            "Advanced permissions",
            "Custom workflows",
            "Dedicated support",
        ],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24">
            <Container>
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-medium text-blue-600">
                            Simple pricing
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Choose the plan that fits your team.
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Start free and upgrade when your business needs more.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl border p-6 ${plan.popular
                                        ? "border-blue-600 shadow-lg"
                                        : "border-slate-200 shadow-sm"
                                    }`}
                            >
                                {plan.popular && (
                                    <span className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                                        Popular
                                    </span>
                                )}

                                <h3 className="text-lg font-semibold">{plan.name}</h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    {plan.description}
                                </p>

                                <div className="mt-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== "$0" && (
                                        <span className="text-sm text-slate-500">/month</span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-medium transition ${plan.popular
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {plan.price === "$0" ? "Get Started" : "Start Free Trial"}
                                </button>

                                <div className="mt-8 space-y-3">
                                    {plan.features.map((feature) => (
                                        <p
                                            key={feature}
                                            className="text-sm text-slate-600"
                                        >
                                            ✓ {feature}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}