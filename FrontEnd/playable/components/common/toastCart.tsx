"use client";

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
}
