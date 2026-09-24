import { Loader } from "lucide-react";

const variants = {
  primary: "bg-primary-dark text-white hover:bg-emerald-800",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "border border-gray-300 bg-white text-ink hover:bg-gray-100",
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  loading = false,
  variant = "primary",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`w-full cursor-pointer rounded-2xl px-4 py-3 text-center font-medium duration-200 enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-200 disabled:text-gray-500 ${variants[variant]}`}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-3">
        <Loader className="animate-spin" size={20} />
        Chargement...
      </span>
    ) : (
      children
    )}
  </button>
);

export default Button;
