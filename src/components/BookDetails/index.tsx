import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getBookById } from "../../services/apis/BookAPI";
import AuthorWrapper from "./AuthorWrapper";
const Container = styled.div`
    width: 100%;
    margin: auto;
    padding: 1rem 0.5rem;
    word-wrap: break-word;
    background-color: #ffffff;
`;
const BookCover = styled.img`
    width: 18rem;
    height: 20rem;
    margin: auto;
    display: block;
`;
const BookTitle = styled.h1`
    font-size: 1.2rem;
    text-align: center;
    color: #a03d00;
`;
const SubWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    font-size: 1.1rem;
    font-weight: 500;
`;
const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
`;
const AddToCartBtn = styled.button`
    width: 80%;
    display: block;
    margin: auto;
    padding: 0.5rem 0;
    font-size: 1rem;
    background-color: #ff6f00;
    border: none;
    font-weight: 500;
    color: #ffffff;
    border-radius: 10px;
    &:hover {
        background-color: #e06100;
        cursor: pointer;
    }
`;
const UpdateButton = styled(AddToCartBtn)`
    background-color: inherit;
    color: #000000;
    margin-top: 1rem;
    border: 2px solid #0053a0;
    &:hover {
        cursor: pointer;
        background-color: #728ea9;
    }
`;
const Section = styled.section`
    margin-top: 1rem;
`;
const SectionHeader = styled.h2`
    font-size: 1rem;
`;
const Description = styled.p``;
const Details = styled.ul``;
const BookDetails = () => {
    const { id } = useParams() as { id: string };
    const { data: book } = useQuery({
        queryKey: ["book", id],
        queryFn: () => getBookById(id),
    });
    const navigate = useNavigate();
    const dateConverter = () => {
        const date = new Date(book?.publicationDate as string);
        return date.toLocaleDateString("en-Us", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };
    return (
        <Container>
            <BookCover
                src={book?.avatar_url || "book-cover-placeholder.jpg"}
                onError={(e) => {
                    e.currentTarget.src = "book-cover-placeholder.jpg";
                }}
            />
            <BookTitle>{book?.title || "Unknown"}</BookTitle>
            {book && <AuthorWrapper authorIds={book.authorIds} />}
            <SubWrapper>
                <span>${book?.price}</span>
                <span>
                    {book && book?.stockQuantity > 0 ? "In Stock" : "Sold Out"}
                </span>
            </SubWrapper>
            <ButtonContainer>
                <AddToCartBtn>Add to cart</AddToCartBtn>
                <UpdateButton
                    onClick={() => {
                        navigate(`/books/update/${book?.book_id}`);
                    }}
                >
                    Update Information
                </UpdateButton>
            </ButtonContainer>
            <Section>
                <SectionHeader>Description</SectionHeader>
                <Description>{book?.description}</Description>
            </Section>
            <Section>
                <SectionHeader>Details</SectionHeader>
                <Details>
                    <li>ISBN: {book?.isbn}</li>
                    <li>Publish date: {dateConverter()}</li>
                </Details>
            </Section>
            <Section>
                <SectionHeader>Reviews</SectionHeader>
                <p>No reviews</p>
            </Section>
        </Container>
    );
};
export default BookDetails;
