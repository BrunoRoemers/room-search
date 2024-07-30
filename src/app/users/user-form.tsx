import type { User } from "@/models/user";
import PasswordField from "./password-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  user: User;
  setUser: (user: User | null) => void;
}

const UserForm = ({ user, setUser }: Props) => {
  return (
    <div className="border border-lime-700 p-4 rounded-2xl space-x-4">
      <label>
        <span className="sr-only">name: </span>
        <input
          type="text"
          placeholder="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="bg-transparent placeholder-lime-700"
        />
      </label>
      <label>
        <span className="sr-only">password: </span>
        <PasswordField
          value={user.secret}
          onChange={(e) => setUser({ ...user, secret: e.target.value })}
          placeholder="secret"
        />
      </label>
      <button onClick={() => setUser(null)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default UserForm;
