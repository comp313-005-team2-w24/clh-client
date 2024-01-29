import { redirect } from "react-router-dom";
import { validateToken } from "../../services/apis/AuthenticationAPI";

export const authFormLoader = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const { valid } = await validateToken(token);
    if (!valid) {
        localStorage.removeItem("token");
        return null;
    }
    return redirect("/");
};
