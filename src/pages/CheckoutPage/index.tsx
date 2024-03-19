import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { devices } from "../../config/devices";
import ItemRow from "./ItemRow";
import { useCartContext } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { Book } from "../../interfaces/Book";
import convertCurrency from "../../utils/convertCurrency";
const Main = styled.main`
    margin-top: 1rem;
    padding-bottom: 1rem;
    @media screen and (${devices.tablets}) {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    @media screen and (${devices.laptops}) {
        width: 95%;
        margin: auto;
    }
`;
const TableContainer = styled.div`
    overflow-x: auto;
`;
const ClearButton = styled.button`
    background-color: inherit;
    border: none;
    outline: none;
    font-size: inherit;
    font-weight: bold;
    color: #f65f5f;
    text-decoration: underline;
    font-style: italic;
    &:hover {
        color: #ff2d2d;
        cursor: pointer;
    }
`;
const ItemsTable = styled.table`
    width: 100%;
    min-width: 30rem;
    background-color: #ffffff;
    margin-top: 0.2rem;
    border-collapse: collapse;
    border-bottom: 1px solid #adadad;
    & thead {
        & tr {
            text-align: left;
        }
        & th {
            padding: 0.5rem;
            box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 1px,
                rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
        }
    }
`;
const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    color: #31718c;
    & a {
        text-decoration: underline;
        color: #31718c;
        &:hover {
            color: #144a61;
        }
    }
`;
const TableFooter = styled.div`
    background-color: #ffffff;
    width: 100%;
    padding: 0.2rem 0.5rem;
`;
const CheckoutDetails = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    margin-left: auto;
    width: fit-content;
    margin-top: 0.2rem;
    & span:nth-child(even) {
        font-weight: bold;
    }
`;
const TAX = 0.13;
const CheckoutPage = () => {
    const { books, clearCart } = useCartContext();
    const [subtotal, setSubtotal] = useState(0);
    const calculateSubtotal = (books: Book[]) => {
        const listPrice = books.map((book) => book.price);
        const total = listPrice.reduce((price, init) => price + init, 0);
        return total;
    };
    const updateSubtotal = (price: number) => {
        setSubtotal(subtotal + price);
    };
    useEffect(() => {
        setSubtotal(calculateSubtotal(books));
    }, [books]);
    return (
        <>
            <header>
                <Navbar />
            </header>
            <Main>
                <div>
                    <TableHeader>
                        <h3>Shopping Cart</h3>
                        <a href="/books">Continue shopping {">"}</a>
                    </TableHeader>
                    <TableContainer>
                        <ItemsTable>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>
                                        <ClearButton
                                            onClick={() => {
                                                clearCart();
                                            }}
                                        >
                                            Clear all
                                        </ClearButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {books &&
                                    books.map((book) => {
                                        return (
                                            <ItemRow
                                                key={book.book_id}
                                                book={book}
                                                updateSubtotal={updateSubtotal}
                                            />
                                        );
                                    })}
                            </tbody>
                        </ItemsTable>
                    </TableContainer>
                    <TableFooter>
                        <CheckoutDetails>
                            <span>Subtotal: </span>
                            <span>${subtotal}</span>

                            <span>Estimated GST/HST:</span>
                            <span>${convertCurrency(subtotal * TAX)}</span>

                            <span>Total:</span>
                            <span>
                                ${convertCurrency(subtotal * (1 + TAX))}
                            </span>
                        </CheckoutDetails>
                    </TableFooter>
                </div>
            </Main>
        </>
    );
};

export default CheckoutPage;
