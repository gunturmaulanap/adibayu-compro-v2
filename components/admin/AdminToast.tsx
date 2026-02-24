"use client";

type AdminToastProps = {
  message?: string;
  type?: "success" | "error";
};

export default function AdminToast({
  message,
  type = "success",
}: AdminToastProps) {
  if (!message) return null;

  return (
    <div className="fixed right-5 top-5 z-[60]">
      <div
        className={`border px-4 py-3 text-sm min-w-[260px] animate-[fadeout_3.2s_ease-in_forwards] ${
          type === "error"
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-gray-300 bg-white text-gray-900"
        }`}
      >
        {message}
      </div>

      <style>{`@keyframes fadeout { 0%, 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }`}</style>
    </div>
  );
}
