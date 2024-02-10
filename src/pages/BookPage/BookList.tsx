import { useQuery } from "react-query";
import styled from "styled-components";
import BookCard from "../../components/BookCard";
import { getAllBooks } from "../../services/apis/BookAPI";
const Container = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;
const BookList = () => {
    const { data: books } = useQuery({
        queryFn: getAllBooks,
        queryKey: ["books"],
    });
    return (
        <Container>
            {books?.map((book) => {
                return <BookCard book={book} key={book.book_id} />;
            })}
        </Container>
    );
};

export default BookList;
