import { type ReactNode } from "react";

type ResponsiveTableProps = {
  children: ReactNode;
  className?: string;
};

export function ResponsiveTable({ children, className = "" }: ResponsiveTableProps) {
  return (
    <div className={`rounded-xl border bg-card shadow-sm overflow-hidden ${className}`}>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          {children}
        </div>
      </div>
    </div>
  );
}
