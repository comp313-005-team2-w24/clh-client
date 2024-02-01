import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
    margin: auto auto 0 auto;
    width: clamp(5rem, 8rem, 15rem);
`;

const Button = styled.button`
    width: 100%;
    border-radius: 10px;
    border: none;
    padding: 0.2rem 0;
    color: #ffffff;
    font-weight: 600;
`;
const LoginButton = styled(Button)`
    background-color: #608ea1;
    &:hover {
        cursor: pointer;
        background-color: #29799b;
    }
`;
const LogoutButton = styled(Button)`
    background-color: #c29013;
    &:hover {
        cursor: pointer;
        background-color: #bdb302;
    }
`;
const AuthButtonContainer = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };
    return (
        <ButtonContainer>
            {isAuthenticated ? (
                <LogoutButton
                    onClick={() => {
                        //clear all token
                        localStorage.removeItem("token");
                        navigate("/auth/login");
                    }}
                >
                    Logout
                </LogoutButton>
            ) : (
                <LoginButton
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                >
                    Login
                </LoginButton>
            )}
        </ButtonContainer>
    );
};

export default AuthButtonContainer;
