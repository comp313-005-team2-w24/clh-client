import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BookCard from "../../components/BookCard";
import BookFilter from "../../components/BookFilter";
import { devices } from "../../config/devices";
import { getAllBooks, getBooksByCategory } from "../../services/apis/BookAPI";
const Container = styled.div`
    width: 95%;
    margin: auto;
`;
export const BookCardsContainer = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    @media screen and (${devices.tablets}) {
        grid-template-columns: repeat(auto-fill, 14rem);
    }
`;
const ButtonContainer = styled.div`
    width: 100%;
    & button {
        font-size: inherit;
        background-color: #0077ff;
        color: #ffffff;
        padding: 0.5rem 2rem;
        font-weight: 500;
        border: none;
        border-radius: 15px;
        box-shadow: rgb(0, 85, 150) 1.95px 1.95px 0;
        transition: 0.3s all ease-in-out;
        transform: translateY(-1px);
        &:hover {
            transform: translateY(0);
            box-shadow: none;
            cursor: pointer;
        }
    }
`;
const BookList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const { data: books } = useQuery({
        queryFn: categoryId
            ? () => getBooksByCategory(categoryId)
            : getAllBooks,
        queryKey: ["books",categoryId],
    });
    const { isAuthenticated } = useLoaderData() as {
        isAuthenticated: boolean;
    };
    return (
        <Container>
            <BookFilter />
            {isAuthenticated && (
                <ButtonContainer>
                    <button
                        aria-label="addBook"
                        onClick={() => {
                            navigate("/admin/books/add");
                        }}
                    >
                        Add New Book <FontAwesomeIcon icon={faPlus} />
                    </button>
                </ButtonContainer>
            )}
            <BookCardsContainer>
                {books?.map((book) => {
                    return <BookCard book={book} key={book.book_id} />;
                })}
            </BookCardsContainer>
        </Container>
    );
};

export default BookList;
