import { QueryClient, QueryClientProvider } from "react-query";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthorForm from "./components/Form/AuthorForm";
import LoginForm from "./components/Form/LoginForm";
import SignUpForm from "./components/Form/SignUpForm";
import AuthenticationPage from "./pages/AuthenticationPage";
import AuthorPage from "./pages/AuthorPage";
import AuthorsList from "./pages/AuthorPage/AuthorsList";
import HomePage from "./pages/HomePage";
import { authFormLoader } from "./utils/loaders/authFormLoader";
import { requireAuth } from "./utils/loaders/requireAuth";
import { authenticationCheck } from "./utils/loaders/authenticationCheck";
import ErrorPage from "./pages/ErrorPage";
import AuthorDetails from "./components/AuthorDetails";
import BookPage from "./pages/BookPage";
import BookForm from "./components/Form/BookForm";
import BookList from "./pages/BookPage/BookList";
import BookDetails from "./components/BookDetails";
import {paymentCheck} from "./utils/loaders/paymentLoader.ts";
import PaymentPage from "./pages/PaymentPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                loader={authenticationCheck}
                element={<HomePage />}
            />
            <Route
                path="/auth"
                loader={authFormLoader}
                element={<AuthenticationPage />}
            >
                <Route index path="login" element={<LoginForm />} />
                <Route path="register" element={<SignUpForm />} />
            </Route>
            <Route
                path="/authors"
                loader={authenticationCheck}
                element={<AuthorPage />}
                id="author"
            >
                <Route index element={<AuthorsList />} />
                <Route
                    loader={requireAuth}
                    path="add"
                    element={<AuthorForm />}
                />
                <Route path=":id" element={<AuthorDetails />} />
            </Route>
            <Route
                path="/books"
                loader={authenticationCheck}
                element={<BookPage />}
                id="book"
            >
                <Route index element={<BookList />} />
                <Route loader={requireAuth} path="add" element={<BookForm />} />
                <Route
                    loader={requireAuth}
                    path="update/:id"
                    element={<BookForm isUpdate/>}
                />
                <Route path=":id" element={<BookDetails />} />
            </Route>
            <Route
                path="/payment"
                loader={paymentCheck}
                element={<PaymentPage />}>

            </Route>
            <Route path="*" element={<ErrorPage />} />
        </>
    )
);
const queryClient = new QueryClient();
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;
