import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../../context/CartContext";
import { Book } from "../../interfaces/Book";
type ItemRowProps = {
    book: Book;
    updateSubtotal: (price: number) => void;
};
const WORD_LIMIT = 25;
const Row = styled.tr`
    & td {
        padding: 0.5rem 0.2rem;
    }
`;
const QuantityInput = styled.input`
    width: 4rem;
    background-color: aliceblue;
    border: none;
    outline: none;
    padding-left: 0.2rem;
`;
const TitleContainer = styled.div`
    display: flex;
    gap: 0.2rem;
    word-wrap: break-word;
    align-items: center;
`;
const TitleLink = styled(Link)`
    text-decoration: underline;
    color: #31718c;
    &:hover {
        color: #144a61;
    }
`;
const DeleteButton = styled.button`
    border: none;
    outline: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #cfcfcf;
    display: block;
    margin: auto;
    &:hover {
        background-color: #fd9e9e;
        cursor: pointer;
    }
`;
const ItemRow = ({ book, updateSubtotal }: ItemRowProps) => {
    const [price, setPrice] = useState(book.price);
    const { removeFromCart } = useCartContext();
    return (
        <Row>
            <td>
                <TitleContainer>
                    <img src={book.avatar_url} width={50} />
                    <TitleLink to={`/books/${book.book_id}`}>
                        {book.title.length > 20
                            ? book.title.slice(0, WORD_LIMIT - 3) + "..."
                            : book.title}
                    </TitleLink>
                </TitleContainer>
            </td>
            <td>
                <QuantityInput
                    type="number"
                    defaultValue={1}
                    onChange={(e) => {
                        if (Number(e.target.value) < 1) {
                            e.target.value = "1";
                        }
                        if (Number(e.target.value) > book.stockQuantity) {
                            e.target.value = `${book.stockQuantity}`;
                        }
                        setPrice((prev) => {
                            const newPrice =
                                Number(e.target.value) * book.price;
                            updateSubtotal(newPrice - prev);
                            return newPrice;
                        });
                    }}
                />
            </td>
            <td>{"$" + price}</td>
            <td>
                <DeleteButton
                    onClick={() => {
                        removeFromCart(book);
                    }}
                >
                    <FontAwesomeIcon icon={faX} size="sm" color="#fff9f9" />
                </DeleteButton>
            </td>
        </Row>
    );
};

export default ItemRow;
