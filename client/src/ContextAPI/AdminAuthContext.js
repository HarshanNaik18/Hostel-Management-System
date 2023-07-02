import { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState({});
  const admin = "admin";
  onAuthStateChanged(auth, (user) => {
    if ("admin" === admin) {
      setCurrentAdmin(user);
    }
  });

  return (
    <AdminAuthContext.Provider value={{ currentAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
