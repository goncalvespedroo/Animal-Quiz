import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "select" | "wrong" | "correct" | "start";
}

export function Button({ children, variant = "select", ...rest }: ButtonProps) {
  const styles = {
    start:
      "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 focus:outline-none mt-4",

    select:
      "text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white focus:outline-none font-medium text-sm px-5 py-2.5 transition-all",

    correct:
      "text-white bg-emerald-600 border border-emerald-500 font-bold rounded-lg text-sm px-5 py-2.5 shadow-lg shadow-emerald-900/20",

    wrong:
      "text-white bg-rose-600 border border-rose-500 font-bold rounded-lg text-sm px-5 py-2.5 shadow-lg shadow-rose-900/20",
  };

  return (
    <button className={styles[variant]} {...rest}>
      {variant === "start" ? (
        <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-slate-900 rounded-md group-hover:bg-transparent">
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
