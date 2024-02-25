import { Outlet, useLoaderData } from "react-router";
import Navbar from "../../components/Navbar";
import AdminValidation from "./AdminValidation";
import styled from "styled-components";
const Main = styled.main`
    margin-top: 2rem;
    padding-bottom: 1rem;
`;
const AdminPage = () => {
    const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };
    if (!isAuthenticated) {
        return (
            <main>
                <AdminValidation />
            </main>
        );
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <Main>
                <Outlet />
            </Main>
        </>
    );
};

export default AdminPage;
