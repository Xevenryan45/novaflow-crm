import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

function Button({
  children,
  variant = "primary",
  onClick
}: ButtonProps) {

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-200 text-slate-800 hover:bg-slate-300"
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        rounded-xl
        font-medium
        transition
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}

export default Button;