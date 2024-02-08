import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import AuthorCard from "../../components/AuthorCard";
import { getAllAuthors } from "../../services/apis/AuthorAPI";
const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
`;
const ButtonContainer = styled.div`
    width: 100%;
    & button {
        font-size: inherit;
        background-color: #27b827;
        color: #ffffff;
        padding: 0.5rem 2rem;
        font-weight: 500;
        border: none;
        border-radius: 15px;
        box-shadow: rgb(35, 161, 0) 1.95px 1.95px 0;
        transition: 0.3s all ease-in-out;
        transform: translateY(-1px);
        &:hover {
            transform: translateY(0);
            box-shadow: none;
            cursor: pointer;
        }
    }
`;
const AuthorsList = () => {
    const { data: authors } = useQuery({
        queryKey: ["authors"],
        queryFn: () => getAllAuthors(),
    });
    const navigate = useNavigate();
    const { isAuthenticated } = useRouteLoaderData("author") as { isAuthenticated: boolean };
    return (
        <Container>
            {isAuthenticated && <ButtonContainer>
                <button
                    aria-label="addAuthor"
                    onClick={() => {
                        navigate("add");
                    }}
                >
                    Add New Author <FontAwesomeIcon icon={faPlus} />
                </button>
            </ButtonContainer>}

            {authors &&
                authors.map((author) => {
                    return <AuthorCard author={author} key={author.author_id}/>;
                })}
        </Container>
    );
};

export default AuthorsList;
