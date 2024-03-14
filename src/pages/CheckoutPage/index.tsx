import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { devices } from "../../config/devices";
import ItemRow from "./ItemRow";
import { useCartContext } from "../../context/CartContext";
const Main = styled.main`
    margin-top: 1rem;
    @media screen and (${devices.tablets}) {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    @media screen and (${devices.laptops}) {
        width: 95%;
        margin: auto;
    }
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
const ItemsList = styled.table`
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.2rem;
    border-collapse: collapse;
    & thead {
        & tr {
            text-align: left;
        }
        & th{
            padding: 0.5rem;
            box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 1px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
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
const CheckoutPage = () => {
    const { books, clearCart } = useCartContext();
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
                    <ItemsList>
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
                                        />
                                    );
                                })}
                        </tbody>
                    </ItemsList>
                </div>
            </Main>
        </>
    );
};

export default CheckoutPage;
