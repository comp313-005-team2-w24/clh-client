const bearerTokenConfig = () => {
    const token = localStorage.getItem("token");
    if (!token || token !== import.meta.env.VITE_ADMIN_TOKEN) {
        throw new Error("No permission to add author");
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return config;
};
export default bearerTokenConfig;
