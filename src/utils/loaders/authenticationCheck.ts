import { validateToken } from "../../services/apis/AuthenticationAPI";

export const authenticationCheck = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return { isAuthenticated: false };
    }
    const { valid, permissions } = await validateToken(token);
    if (!valid) {
        return { isAuthenticated: false };
    }
    return { isAuthenticated: true, permissions };
};
