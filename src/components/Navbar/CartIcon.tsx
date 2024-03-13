import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import { useCartContext } from "../../context/CartContext";
const fadeDown = keyframes`
    from{
        transform: translateY(-10px);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
`
const Container = styled.div`
    position: relative;
    & .fa-cart:hover {
        color: #29799b;
        cursor: pointer;
    }
`;
const Badge = styled.div`
    display: flex;
    position: absolute;
    top: -10px;
    right: -7px;
    font-size: 0.9rem;
    background-color: #e06100;
    height: 1.2rem;
    width: 1.3rem;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    animation: ${fadeDown} 0.4s ease-in-out;
`;
const CartIcon = () => {
    const {books} = useCartContext();
    return (
        <Container>
            <FontAwesomeIcon
                icon={faCartShopping}
                color="#31718c"
                size="xl"
                className="fa-cart"
            />
            <Badge key={books.length}>{books.length}</Badge>
        </Container>
    );
};

export default CartIcon;
