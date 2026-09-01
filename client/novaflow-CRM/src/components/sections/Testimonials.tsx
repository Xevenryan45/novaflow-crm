import Container from "../common/Container";
import { LuQuote } from "react-icons/lu";
import Reveal from "../common/Reveal";

const testimonials = [
    {
        quote:
            "NovaFlow completely changed how our team manages projects. Everything feels organized and easy to understand.",
        name: "Sarah Mitchell",
        role: "Product Manager",
    },
    {
        quote:
            "We replaced several different tools with NovaFlow. Our team is more productive and our workflow is much simpler.",
        name: "James Carter",
        role: "Founder & CEO",
    },
    {
        quote:
            "The analytics and customer management features give us exactly the visibility we need to make better decisions.",
        name: "Daniel Williams",
        role: "Operations Lead",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-slate-50 py-24">
            <Container>
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-medium text-blue-600">
                            Loved by modern teams
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Teams work better with NovaFlow.
                        </h2>

                        <p className="mt-4 text-slate-600">
                            See how teams are using NovaFlow to simplify their everyday work.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <LuQuote size={28} className="text-blue-600" />

                                <p className="mt-5 text-sm leading-7 text-slate-600">
                                    “{testimonial.quote}”
                                </p>

                                <div className="mt-6 border-t border-slate-100 pt-5">
                                    <p className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}