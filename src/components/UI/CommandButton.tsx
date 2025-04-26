
import React from "react";
import { cn } from "@/lib/utils";

interface CommandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isActive?: boolean;
}

const CommandButton: React.FC<CommandButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  isActive = false,
  className,
  ...props
}) => {
  const baseStyles = "font-mono uppercase tracking-wide transition-all duration-300 rounded flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-vesper-navy hover:bg-vesper-navy/80 text-white border border-vesper-teal/30",
    secondary: "bg-vesper-indigo hover:bg-vesper-indigo/80 text-white border border-vesper-gold/30",
    danger: "bg-vesper-accent hover:bg-vesper-accent/80 text-white",
    ghost: "bg-transparent hover:bg-vesper-midnight text-vesper-teal hover:text-vesper-gold border border-transparent hover:border-vesper-teal/30",
  };
  
  const sizeStyles = {
    sm: "text-xs py-1 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };
  
  const activeStyles = isActive
    ? "ring-2 ring-vesper-gold/50 shadow-[0_0_8px_rgba(255,215,0,0.3)]"
    : "";

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        activeStyles,
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default CommandButton;
