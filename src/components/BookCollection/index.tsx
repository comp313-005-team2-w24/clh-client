import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import styled from "styled-components";
import { BookCardsContainer } from "../../pages/BookPage/BookList";
import { getCategoryById } from "../../services/apis/CategoryAPI";
import BookCard from "../BookCard";
import { getAllBooks } from "../../services/apis/BookAPI";
import { devices } from "../../config/devices";
import { Link } from "react-router-dom";
const Container = styled.div`
    width: 95%;
    margin: auto;
`;
const TypeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 90%;
    & a {
        color: #0068a9;
        font-size: clamp(0.9rem, 3vw, 1.4rem);
        font-weight: bold;
        &:hover {
            cursor: pointer;
            color: #0068a9;
            text-decoration: underline;
        }
    }
`;
const BooksContainer = styled(BookCardsContainer)`
    margin-top: 0.2rem;
    @media screen and (${devices.tablets}) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (${devices.laptops}) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (${devices.desktops}) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
type BookCollectionProps = {
    categoryId?: number | string;
};
const LIMIT_BOOKS = 5;
const BookCollection = ({ categoryId }: BookCollectionProps) => {
    const { data: category } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getCategoryById(categoryId as string),
    });
    const { data: books } = useQuery({
        queryKey: ["books"],
        queryFn: () => getAllBooks(),
    });
    if (categoryId === undefined) {
        return (
            <Container>
                <TypeContainer>
                    <FontAwesomeIcon
                        className="fa-spin"
                        icon={faStar}
                        color="#cd5d02"
                    />
                    <Link to={"/books"}>New Arrivals</Link>
                </TypeContainer>
                <BooksContainer>
                    {books &&
                        books.slice(-5).map((book) => {
                            return <BookCard book={book} key={book.book_id} />;
                        })}
                </BooksContainer>
            </Container>
        );
    }
    return (
        <>
            {category && (
                <Container>
                    <TypeContainer>
                        <FontAwesomeIcon
                            className="fa-spin"
                            icon={faStar}
                            color="#cd5d02"
                        />
                        <Link to={`/books?categoryId=${category.id}`}>
                            {category.name}
                        </Link>
                    </TypeContainer>
                    <BooksContainer>
                        {category.books &&
                            category.books
                                .slice(0, LIMIT_BOOKS + 1)
                                .map((book) => {
                                    return (
                                        <BookCard
                                            book={book}
                                            key={book.book_id}
                                        />
                                    );
                                })}
                    </BooksContainer>
                </Container>
            )}
        </>
    );
};

export default BookCollection;
