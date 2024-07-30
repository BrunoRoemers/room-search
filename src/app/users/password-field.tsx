import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type InputHTMLAttributes } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface Props {
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
}

const PasswordField = ({ value, onChange, placeholder }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span>
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent placeholder-lime-700"
      />
      <button onClick={(e) => setIsVisible(!isVisible)} className="-ml-5">
        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} fixedWidth />
      </button>
    </span>
  );
};

export default PasswordField;
