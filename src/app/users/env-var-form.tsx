import React, { useEffect, useState, type KeyboardEvent } from "react";
import { deserializeUsers, serializeUsers, User } from "@/models/user";

export interface Props {
  label: string;
  users: User[];
  setUsers: (users: User[]) => void;
  hasError: boolean;
  setError: (error: any | null) => void;
}

const EnvVarForm = ({ label, users, setUsers, hasError, setError }: Props) => {
  const [value, setValue] = useState(serializeUsers(users));

  useEffect(() => setValue(serializeUsers(users)), [users]);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        setError(null);
        setUsers(deserializeUsers(value));
      } catch (error) {
        setUsers([]);
        setError(error);
      }
    }
  };

  return (
    <label>
      <span className="text-lime-700 align-top">{label}</span>
      <input
        type="text"
        value={value}
        placeholder="<empty>"
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyUp={handleKeyUp}
        className={"text-ellipsis" + (hasError ? " text-rose-800" : "")}
      />
    </label>
  );
};

export default EnvVarForm;
