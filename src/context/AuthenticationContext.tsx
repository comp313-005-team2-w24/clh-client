/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { validateToken } from "../services/apis/AuthenticationAPI";

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean | undefined;
    setNewToken: (newToken: string) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean|undefined>();
    useEffect(() => {
        if (token) {
            const checkToken = async () => {
                const { valid } = await validateToken(token);
                if (!valid) {
                    //clear all token
                    localStorage.removeItem("token");
                    setNewToken("");
                }
                setIsAuthenticated(valid);
            };
            checkToken();
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);
    const setNewToken = (newToken: string) => {
        setToken(newToken);
    };
    return (
        <AuthContext.Provider value={{ token, isAuthenticated, setNewToken }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be use within AuthContextProvider"
        );
    }
    return context;
};
export default AuthContextProvider;
