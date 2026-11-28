
function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition
        disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant] || variants.primary}
        ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
