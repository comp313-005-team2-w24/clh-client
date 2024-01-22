import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
const Container = styled.div`
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-rows: auto auto;
    gap: 1rem;
`;
const Introduction = styled.div``;
const BriefDescription = styled.p`
    text-align: center;
`;
const LogoContainer = styled.div`
    width: fit-content;
    margin: auto;
`;
const Logo = styled.img`
    width: 10rem;
    height: 10rem;
    margin: auto;
`;
const AuthenticationPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/auth/login");
    }, []);
    return (
        <Container>
            <Introduction>
                <LogoContainer>
                    <Logo src="/icon.png" />
                </LogoContainer>
                <BriefDescription>
                    Fuel your coding journey with our developer-centric online
                    bookstore
                </BriefDescription>
            </Introduction>
            <Outlet />
        </Container>
    );
};

export default AuthenticationPage;
