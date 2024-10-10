import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AuthContextProps = {
  hasRequiredFields: boolean | undefined;
  localStorageValues: string | null;
  setLocalStorage: (value: string) => void;
};

const LOCAL_STORAGE_KEY = "userProfile";

// In lieu of a proper authentication handler or system which is way beyond the scope of this test
// we will just prevent closing of the modal if the values are not set.
// I acknowledge this is a little gros
export const requiredValuesSet = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const requiredValues =
    localStorage.getItem(LOCAL_STORAGE_KEY) &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);

  if (requiredValues && requiredValues.username && requiredValues.title) {
    return true;
  }
  return false;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

// Custom probider to handle the shared context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [hasRequiredFields, setHasRequiredFields] = useState<boolean>();
  const [localStorageValues, setLocalStorageValues] = useState<string | null>(
    null
  );

  useEffect(() => {
    setHasRequiredFields(requiredValuesSet());
    setLocalStorageValues(localStorage.getItem(LOCAL_STORAGE_KEY));
  }, [setHasRequiredFields, setLocalStorageValues]);

  const setLocalStorage = (value: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
    setLocalStorageValues(value);
    setHasRequiredFields(requiredValuesSet());
  };

  return (
    <AuthContext.Provider
      value={{ hasRequiredFields, setLocalStorage, localStorageValues }}
    >
      {children}
    </AuthContext.Provider>
  );
};
