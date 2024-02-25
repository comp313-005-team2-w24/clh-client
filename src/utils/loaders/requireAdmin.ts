export const requireAdmin = async () => {
    const adminToken = localStorage.getItem("token");
    if (adminToken !== import.meta.env.VITE_ADMIN_TOKEN) {
        return { isAuthenticated: false };
    }
    return { isAuthenticated: true };
};
