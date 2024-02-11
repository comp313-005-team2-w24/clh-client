import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const Main = styled.main`
    margin-top: 2rem;
    padding-bottom: 1rem;
`;
const BookPage = () => {
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

export default BookPage;
