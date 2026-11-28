
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition
            ${Icon ? "pl-10" : ""}
            ${error
              ? "border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default InputField;
