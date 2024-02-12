import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
const Main = styled.main`
    margin-top: 2rem;
    padding-bottom: 1rem;
`;
const AuthorPage = () => {
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

export default AuthorPage;
