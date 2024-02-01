import { redirect } from "react-router-dom";
import { validateToken } from "../../services/apis/AuthenticationAPI";

export const requireAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/auth/login");
    }
    const { valid } = await validateToken(token);
    if (!valid) {
        localStorage.removeItem("token");
        return redirect("/auth/login");
    }
    return null;
};
