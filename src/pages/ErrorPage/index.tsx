import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Main = styled.main`
    text-align: center;
    margin: 0;
    padding: 5rem;
    & h2 {
        color: white; /* Set the text color to white */
        font-size: 3rem;
    }

    & p {
        font-size: 1.2rem;
    }

    & button {
        background: none;
        border: none;
        font-size: 1.2rem;
        margin-top: 1rem;
        background-color: #ffa807;
        padding: 0.2rem 2rem;
        font-weight: bold;
        color: #ffffff;
        border-radius: 10px;
        &:hover {
            cursor: pointer;
            background-color: #e59500;
        }
    }
`;
const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Main>
            <FontAwesomeIcon icon={faFaceFrown} color="white" size="2xl" />
            <h2>404 - Not Found</h2>
            <p>Sorry, the page you are looking for doesn't exist</p>
            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                Go Back
            </button>
        </Main>
    );
};

export default ErrorPage;
