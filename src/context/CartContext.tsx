import { createContext, useContext, useState } from "react";
import { Book } from "../interfaces/Book";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type CartValues = {
    addToCart: (book: Book) => void;
    books: Book[];
};

const CartContext = createContext<CartValues | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const booksAdded = JSON.parse(
        localStorage.getItem("cart") as string
    ) as Book[];
    const [books, setBooks] = useState<Book[]>(booksAdded || []);
    const addToCart = (book: Book) => {
        setBooks((prev) => {
            const newList = [...prev];
            if (
                newList.findIndex((item) => item.book_id === book.book_id) ===
                -1
            ) {
                newList.push(book);
                toast.success("Added to the shopping cart !");
            }
            else{
                toast.error("Already in the shopping cart !");
            }
            localStorage.setItem("cart", JSON.stringify(newList));
            return newList;
        });
    };
    return (
        <CartContext.Provider value={{ books, addToCart }}>
            {children}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCardContext must be used within CardProvider");
    }
    return context;
};

export default CartProvider;
