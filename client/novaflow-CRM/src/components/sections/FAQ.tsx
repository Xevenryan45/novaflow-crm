import { useState } from "react";
import Container from "../common/Container";
import { LuPlus, LuMinus } from "react-icons/lu";

const faqs = [
  {
    question: "What is NovaFlow?",
    answer:
      "NovaFlow is an all-in-one workspace that helps teams manage customers, projects, workflows, and business insights in one place.",
  },
  {
    question: "Can I use NovaFlow for free?",
    answer:
      "Yes. NovaFlow includes a free Starter plan that lets you get started without a subscription.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely. You can upgrade whenever your team needs more features, members, or advanced capabilities.",
  },
  {
    question: "Is NovaFlow suitable for small teams?",
    answer:
      "Yes. NovaFlow is designed to work for individuals, small teams, and growing organizations.",
  },
  {
    question: "Can my team collaborate inside NovaFlow?",
    answer:
      "Yes. Teams can manage projects, workflows, customers, and shared information from the same workspace.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-blue-600">
            Frequently asked questions
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Got questions? We've got answers.
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to know about getting started with NovaFlow.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                >
                  <span className="font-medium text-slate-900">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <LuMinus className="shrink-0 text-blue-600" size={20} />
                  ) : (
                    <LuPlus className="shrink-0 text-slate-500" size={20} />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}