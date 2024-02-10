import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Author } from "../../interfaces/Author";
import { Book } from "../../interfaces/Book";
import { getAuthorById } from "../../services/apis/AuthorAPI";
const Container = styled.div`
    width: 17rem;
    height: fit-content;
    background-color: #ffffff;
    word-wrap: break-word;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const Status = styled.div`
    text-align: center;
    font-weight: 600;
    background-color: #00af00;
    color: #ffffff;
`;
const BookCover = styled.img`
    width: inherit;
`;
const BookTitle = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
`;
const CardLink = styled(Link)`
    text-decoration: none;
    color: #a03d00;
    &:hover {
        text-decoration: underline;
    }
`;
const AuthorWrapper = styled.div`
    text-align: center;
    font-size: 0.9rem;
    & a {
        color: #00a8fd;
    }
`;
const CardFooter = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    width: 100%;
    padding: 0.2rem;
    text-align: right;
    margin-top: 0.5rem;
`;
const Button = styled.button`
    padding: 0.2rem 0;
    background-color: #ff6f00;
    color: #ffffff;
    border: none;
    font-weight: bold;
    &:hover {
        background-color: #e06100;
        cursor: pointer;
    }
`;
const Price = styled.span`
    font-weight: 500;
`;
type BookCardProps = {
    book: Book;
};
const BookCard = ({ book }: BookCardProps) => {
    const results = useQueries<Author[]>(
        book.authorIds.map((id) => {
            return {
                queryKey: ["author", id],
                queryFn: () => getAuthorById(id.toString()),
                staleTime: Infinity,
            };
        })
    );
    return (
        <Container>
            <Status>
                <span aria-label="status">
                    {book.stockQuantity > 0 ? "Available" : "Sold out"}
                </span>
            </Status>
            <BookCover src="book-cover-placeholder.jpg" />
            <BookTitle>
                {/* Maximum number of words is 25 to not break the structure */}
                <CardLink to={"#"} aria-label="title">
                    {book.title || "Unknown"}
                </CardLink>
            </BookTitle>
            {/* Maximum number of words is 20 to not break the structure */}
            <AuthorWrapper>
                <span>by</span> {/* Display all authors related to book */}
                {results.map((result) => {
                    const authorResult = result.data as Author;
                    if (authorResult) {
                        return (
                            <Fragment key={authorResult.author_id}>
                                <CardLink
                                    to={`/authors/${authorResult.author_id}`}
                                    aria-label="author"
                                >
                                    {result.isLoading
                                        ? "Loading..."
                                        : authorResult.name}
                                </CardLink>
                                {results.indexOf(result) === results.length - 1
                                    ? ""
                                    : ","}
                            </Fragment>
                        );
                    }
                })}
            </AuthorWrapper>
            <CardFooter>
                <Button aria-label="addToCart">
                    <FontAwesomeIcon icon={faCartShopping} /> Add to cart
                </Button>
                <Price aria-label="price">
                    {book.price ? `$${book.price}` : "Updating"}
                </Price>
            </CardFooter>
        </Container>
    );
};

export default BookCard;
