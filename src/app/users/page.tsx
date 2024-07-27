"use client";

import { useEffect, useState } from "react";
import { emptyUser, type User } from "@/models/user";
import UserForm from "./user-form";
import EnvVarForm from "./env-var-form";

const UsersPage = () => {
  const [error, setError] = useState<any | null>(null);
  const [users, setUsers] = useState<User[]>([emptyUser]);

  useEffect(() => {
    const secrets = new Set();
    for (const user of users) {
      if (secrets.has(user.secret)) {
        setError("All secrets must be unique");
        return;
      }
      secrets.add(user.secret);
    }
    setError(null);
  }, [users]);

  const replaceUser = (i: number, newUser: User | null) =>
    setUsers((prevUsers) =>
      newUser === null && prevUsers.length > 1
        ? prevUsers.toSpliced(i, 1)
        : prevUsers.toSpliced(i, 1, newUser ?? emptyUser)
    );

  const appendUser = () => setUsers((prevUsers) => [...prevUsers, emptyUser]);

  return (
    <div className="space-y-14">
      <h1 className="text-3xl">Configure Users</h1>
      {error !== null && (
        <div className="text-rose-800">{error.toString()}</div>
      )}
      {users.length > 0 && (
        <ul className="space-y-4">
          {users.map((user, i) => (
            <li key={i}>
              <UserForm
                user={user}
                setUser={(newUser) => replaceUser(i, newUser)}
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={appendUser}>Add User</button>
      <div>
        <EnvVarForm
          label="API_USERS_BASE64="
          users={users}
          setUsers={setUsers}
          hasError={error !== null}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default UsersPage;
