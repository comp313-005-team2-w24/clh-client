import { QueryClient, QueryClientProvider } from "react-query";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthorDetails from "./components/AuthorDetails";
import BookDetails from "./components/BookDetails";
import AuthorForm from "./components/Form/AuthorForm";
import BookForm from "./components/Form/BookForm";
import LoginForm from "./components/Form/LoginForm";
import SignUpForm from "./components/Form/SignUpForm";
import AdminPage from "./pages/AdminPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import AuthorPage from "./pages/AuthorPage";
import AuthorsList from "./pages/AuthorPage/AuthorsList";
import BookPage from "./pages/BookPage";
import BookList from "./pages/BookPage/BookList";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { authFormLoader } from "./utils/loaders/authFormLoader";
import { authenticationCheck } from "./utils/loaders/authenticationCheck";
import { requireAdmin } from "./utils/loaders/requireAdmin";
import CategoryForm from "./components/Form/CategoryForm";
import CategoryPage from "./pages/CategoryPage";

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
            <Route path="/admin" loader={requireAdmin} element={<AdminPage />}>
                <Route path="books">
                    <Route path="add" element={<BookForm />} />
                    <Route path="update/:id" element={<BookForm isUpdate />} />
                </Route>
                <Route path="authors">
                    <Route path="add" element={<AuthorForm />} />
                </Route>
                <Route path="categories">
                    <Route index element={<CategoryPage />} />
                    <Route path="add" element={<CategoryForm />} />
                    <Route path="update/:id" element={<CategoryForm isUpdate/>} />
                </Route>
            </Route>
            <Route
                path="/authors"
                loader={authenticationCheck}
                element={<AuthorPage />}
                id="author"
            >
                <Route index loader={requireAdmin} element={<AuthorsList />} />
                <Route path=":id" element={<AuthorDetails />} />
            </Route>
            <Route
                path="/books"
                loader={authenticationCheck}
                element={<BookPage />}
                id="book"
            >
                <Route index loader={requireAdmin} element={<BookList />} />
                <Route
                    path=":id"
                    loader={requireAdmin}
                    element={<BookDetails />}
                />
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
