import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../config/devices";
import { deleteBook, getBookById } from "../../services/apis/BookAPI";
import AuthorWrapper from "./AuthorWrapper";
const Container = styled.div`
    width: 100%;
    margin: auto;
    padding: 1rem 0.5rem;
    word-wrap: break-word;
    background-color: #ffffff;
    @media screen and (${devices.tablets}) {
        display: grid;
        grid-template-columns: 35% 65%;
    }
    @media screen and (${devices.laptops}) {
        width: 80%;
    }
`;
const RightContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
`;
const BookCover = styled.div`
    & img {
        margin: 0 auto;
        width: 13rem;
        display: block;
        @media screen and (${devices.tablets}) {
            margin: 0;
            width: 100%;
            height: 25rem;
        }
        @media screen and (${devices.laptops}) {
            width: 100%;
            height: 25rem;
        }
    }
`;
const BookTitle = styled.h1`
    font-size: 1.2rem;
    text-align: center;
    color: #a03d00;
    @media screen and (${devices.tablets}) {
        text-align: left;
    }
`;
const SubWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    font-weight: 500;
    @media screen and (${devices.tablets}) {
        align-items: start;
        justify-content: start;
        width: 100%;
        padding: 0;
        gap: 1rem;
    }
`;
const Status = styled.span<{ $inStock: boolean }>`
    color: ${(props) => (props.$inStock ? "#04db00" : "#fb4444")};
`;
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1rem;
    flex-direction: column;
    gap: 1rem;
    @media screen and (${devices.tablets}) {
        flex-direction: row;
        align-items: start;
        justify-content: start;
        flex-wrap: wrap;
        gap: 0.5rem;
        & button {
            margin: 0;
            width: 12rem;
        }
    }
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
    border: 1px solid #0053a0;
    &:hover {
        cursor: pointer;
        background-color: #728ea9;
    }
`;
const DeleteButton = styled(AddToCartBtn)`
    background-color: #ff2727;
    &:hover {
        background-color: #cc0000;
        cursor: pointer;
    }
`;
const Section = styled.section`
    margin-top: 1rem;
    width: 100%;
    word-wrap: break-word;
`;
const SectionHeader = styled.h2`
    font-size: 1rem;
`;
const Description = styled.p`
    width: 100%;
    word-wrap: break-word;
`;
const Details = styled.ul`
    list-style: none;
`;
const BookDetails = () => {
    const { id } = useParams() as { id: string };
    const { isAuthenticated } = useLoaderData() as {
        isAuthenticated: boolean;
    };
    const queryClient = useQueryClient();
    const { data: book } = useQuery({
        queryKey: ["book", id],
        queryFn: () => getBookById(id),
    });
    const navigate = useNavigate();
    const { mutateAsync: deleteBookMutation } = useMutation({
        mutationFn: (id: string) => deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authors"] });
            navigate("/books");
        },
    });
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
            <BookCover>
                <img
                    src={book?.avatar_url || "book-cover-placeholder.jpg"}
                    onError={(e) => {
                        e.currentTarget.src = "book-cover-placeholder.jpg";
                    }}
                />
            </BookCover>
            <RightContainer>
                <BookTitle>{book?.title || "Unknown"}</BookTitle>
                {book && <AuthorWrapper authorIds={book.authorIds} />}
                <SubWrapper>
                    <span>Price: ${book?.price}</span>
                    <span>
                        Status:{" "}
                        <Status
                            $inStock={
                                book && book?.stockQuantity > 0 ? true : false
                            }
                        >
                            {book && book?.stockQuantity > 0
                                ? "In Stock"
                                : "Sold Out"}
                        </Status>
                    </span>
                </SubWrapper>
                <ButtonContainer>
                    {isAuthenticated ? (
                        <>
                            <UpdateButton
                                onClick={() => {
                                    navigate(
                                        `/admin/books/update/${book?.book_id}`
                                    );
                                }}
                            >
                                Update
                            </UpdateButton>
                            <DeleteButton
                                onClick={async () => {
                                    if (book) {
                                        await deleteBookMutation(id);
                                    }
                                }}
                            >
                                Delete
                            </DeleteButton>
                        </>
                    ) : (
                        <AddToCartBtn>Add to cart</AddToCartBtn>
                    )}
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
            </RightContainer>
        </Container>
    );
};
export default BookDetails;
