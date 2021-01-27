import React, { createContext, useState } from 'react';

export const UserContext = createContext({ user: null, setUser: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
