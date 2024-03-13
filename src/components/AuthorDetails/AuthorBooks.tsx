import styled from "styled-components";
import { devices } from "../../config/devices";
import { Book } from "../../interfaces/Book";
import BookCard from "../BookCard";
const Container = styled.div`
    width: 95%;
    margin: 1rem auto;
    & h2 {
    }
`;
const BooksContainer = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    @media screen and (${devices.tablets}) {
        grid-template-columns: repeat(auto-fill, 14rem);
    }
`;
type AuthorBooksProps = {
    books: Book[];
};
const AuthorBooks = ({ books }: AuthorBooksProps) => {
    return (
        <Container>
            <h2>Books</h2>
            <BooksContainer>
                {books.map((book) => {
                    return <BookCard book={book} key={book.book_id} isOwner/>;
                })}
            </BooksContainer>
        </Container>
    );
};

export default AuthorBooks;
