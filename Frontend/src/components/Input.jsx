import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  title,
  placeholder,
  type = "text",
  inputValue,
  setUserData,
  autoComplete,
  minLength,
}) => {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-soft focus-within:outline-2 focus-within:outline-primary-dark">
      <div className="flex min-w-0 flex-1 flex-col">
        <label htmlFor={id} className="text-sm text-gray-500">
          {title}
        </label>
        <input
          id={id}
          className="w-full bg-transparent py-1 text-lg outline-none"
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          value={inputValue}
          onChange={(e) => setUserData(e.target.value)}
        />
      </div>
      {isPassword && (
        <button
          type="button"
          className="cursor-pointer text-gray-500 hover:text-ink"
          aria-label={
            visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      )}
    </div>
  );
};

export default Input;
