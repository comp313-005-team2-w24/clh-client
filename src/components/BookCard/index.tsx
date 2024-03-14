import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../config/devices";
import { useCartContext } from "../../context/CartContext";
import { Book } from "../../interfaces/Book";
import { getAuthorById } from "../../services/apis/AuthorAPI";
const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding-bottom: 0.2rem;
    background-color: #ffffff;
    word-wrap: break-word;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: clamp(0.8rem, 3vw, 1rem);
    @media screen and (${devices.tablets}) {
        font-size: 1rem;
    }
`;
const Status = styled.div<{ $isSoldOut?: boolean }>`
    text-align: center;
    font-weight: 600;
    background-color: ${(props) => (props.$isSoldOut ? "#d10000" : "#00af00")};
    color: #ffffff;
`;
const BookCover = styled.img`
    width: inherit;
    height: 13rem;
    &:hover {
        cursor: pointer;
        filter: brightness(80%);
    }
`;
const BookTitle = styled.div`
    text-align: center;
    font-weight: bold;
    @media screen and (${devices.tablets}) {
        font-size: 1.05rem;
    }
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
    &:disabled {
        background-color: #582600;
    }
`;
const Price = styled.span`
    font-weight: 500;
`;
type BookCardProps = {
    book: Book;
    isOwner?: boolean;
};
const MAXIMUM_WORDS = 19;
const BookCard = ({ book, isOwner }: BookCardProps) => {
    const { data, isLoading } = useQuery({
        queryKey: ["author", book.authorIds[0]],
        queryFn: () => getAuthorById(book.authorIds[0].toString()),
    });
    const navigate = useNavigate();
    const firstAuthor = data?.author;
    const { addToCart } = useCartContext();
    return (
        <Container>
            <Status $isSoldOut={book.stockQuantity < 1}>
                <span aria-label="status">
                    {book.stockQuantity > 0 ? "Available" : "Sold out"}
                </span>
            </Status>
            <BookCover
                src={book.avatar_url || "book-cover-placeholder.jpg"}
                onClick={() => {
                    {
                        navigate(`/books/${book.book_id}`);
                    }
                }}
                onError={(e) => {
                    e.currentTarget.src = "book-cover-placeholder.jpg";
                }}
            />
            <BookTitle>
                {/* Maximum number of words is 20 to not break the structure */}
                <CardLink to={`/books/${book.book_id}`} aria-label="title">
                    {book.title
                        ? book.title.length > MAXIMUM_WORDS
                            ? book.title.slice(0, MAXIMUM_WORDS - 3) + "..."
                            : book.title
                        : "Unknown"}
                </CardLink>
            </BookTitle>
            {/* Maximum number of words is 20 to not break the structure */}
            {!isOwner && (
                <AuthorWrapper>
                    <span>by</span>{" "}
                    {/* Display only first author related to book */}
                    <CardLink
                        to={`/authors/${firstAuthor?.author_id}`}
                        aria-label="author"
                    >
                        {isLoading
                            ? "Loading..."
                            : firstAuthor?.name &&
                              firstAuthor.name.length > MAXIMUM_WORDS
                            ? firstAuthor.name.slice(0, MAXIMUM_WORDS - 3) +
                              "..."
                            : firstAuthor?.name}
                    </CardLink>
                </AuthorWrapper>
            )}
            <CardFooter>
                <Button
                    aria-label="addToCart"
                    disabled={book.stockQuantity < 1}
                    onClick={() => {
                        addToCart(book);
                    }}
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                </Button>
                <Price aria-label="price">
                    {book.price ? `$${book.price}` : "Updating"}
                </Price>
            </CardFooter>
        </Container>
    );
};

export default BookCard;
