import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Section({
  children,
}: Props) {
  return (
    <section className="py-24">
      {children}
    </section>
  );
}