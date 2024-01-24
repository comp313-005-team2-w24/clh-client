import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthenticationContext";

const ButtonContainer = styled.div`
    margin: auto auto 0 auto;
    width: clamp(5rem,8rem,15rem);
`;

const Button = styled.button`
    width: 100%;
    border-radius: 10px;
    border: none;
    padding: 0.2rem 0;
    background-color: #608ea1;
    color: #ffffff;
    font-weight: 600;
    &:hover {
        cursor: pointer;
        background-color: #29799b;
    }
`;
const AuthButtonContainer = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();
    return (
        <ButtonContainer>
            {isAuthenticated ? (
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                >
                    Login
                </Button>
            )}
        </ButtonContainer>
    );
};

export default AuthButtonContainer;
