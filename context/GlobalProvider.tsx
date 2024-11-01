import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context
const GlobalContext = createContext<any>(null);

// Custom hook to use the context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

// Provider component with children prop typed as ReactNode
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialization or data fetching logic can go here
    getCurrentUser().then((res) => {
      if (res) {
        setIsLogged(true);
        setUser(res);
      }
      else{
        setIsLogged(false);
        setUser(null);
      }
    }).catch((err) => {
      // setIsLogged(false);
      // setUser(null);
      console.log(err);
    }
  ).finally(()=>{setLoading(false)});
  },[]) 

  return (
    <GlobalContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
