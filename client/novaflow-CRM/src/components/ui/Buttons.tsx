import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-200 text-slate-800 hover:bg-slate-300"
  };

  return (
    <button
      className={`
        px-6 py-3
        rounded-xl
        font-medium
        transition
        ${styles[variant]}
        ${className ?? ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;