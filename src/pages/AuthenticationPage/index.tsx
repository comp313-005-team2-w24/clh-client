import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { devices } from "../../config/devices";
const Container = styled.div`
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-rows: auto auto;
    gap: 1rem;
    @media screen and (${devices.tablets}) {
        grid-template-columns: 50% 50%;
        grid-template-rows: none;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    @media screen and (${devices.laptops}) {
        margin: 0 10%;
    }
`;
const Introduction = styled.div``;
const BriefDescription = styled.p`
    text-align: center;
    color: #2c4550;
    font-size: 1.2rem;
    font-weight: 500;
`;
const LogoContainer = styled.div`
    width: fit-content;
    margin: auto;
`;
const Logo = styled.img`
    width: 10rem;
    height: 10rem;
    margin: auto;
    &:hover{
        cursor: pointer;
    }
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
                    <Logo
                        src="/icon.png"
                        data-testid="logo"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </LogoContainer>
                <BriefDescription data-testid="brief">
                    Fuel your coding journey with our developer-centric online
                    bookstore
                </BriefDescription>
            </Introduction>
            <Outlet />
        </Container>
    );
};

export default AuthenticationPage;
