import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import LoginForm from "./components/Form/LoginForm";
import SignUpForm from "./components/Form/SignUpForm";
import { authFormLoader } from "./utils/loaders/authFormLoader";
import AuthorPage from "./pages/AuthorPage";
import AuthorsList from "./pages/AuthorPage/AuthorsList";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/auth"
                loader={authFormLoader}
                element={<AuthenticationPage />}
            >
                <Route index path="login" element={<LoginForm />} />
                <Route path="register" element={<SignUpForm />} />
            </Route>
            <Route path="/authors" element={<AuthorPage />}>
                <Route index element={<AuthorsList />} />
            </Route>
        </>
    )
);
const queryClient = new QueryClient();
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />;
        </QueryClientProvider>
    );
};

export default App;
