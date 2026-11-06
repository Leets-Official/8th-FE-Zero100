import { useEffect, useState } from 'react';
import { loadUser, saveUser } from '../../utils/dashboard/userStorage.js';

export function useUser() {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const changeName = (name) => {
    setUser({ ...user, name });
  };

  return { user, changeName };
}
