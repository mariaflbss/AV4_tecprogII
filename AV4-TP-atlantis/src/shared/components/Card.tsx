import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className = "",
  padding = "md",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-sm
        ${paddingMap[padding]}
        ${hover ? "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}