import { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return (
    <UserAuthContext.Provider value={{ currentUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};
