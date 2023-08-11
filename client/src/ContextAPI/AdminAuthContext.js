import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentAdmin(user);
      console.log(user);
    });
    return () => {
      unSubscribe();
    };
    
  }, []);

  return (
    <AdminAuthContext.Provider value={{ currentAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
