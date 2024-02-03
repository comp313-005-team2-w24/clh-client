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
import { authenticationCheck } from './utils/loaders/authenticationCheck';
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" loader={authenticationCheck} element={<HomePage />} />
            <Route
                path="/auth"
                loader={authFormLoader}
                element={<AuthenticationPage />}
            >
                <Route index path="login" element={<LoginForm />} />
                <Route path="register" element={<SignUpForm />} />
            </Route>
            <Route path="/authors" loader={authenticationCheck} element={<AuthorPage />}>
                <Route index element={<AuthorsList />} />
                <Route
                    loader={requireAuth}
                    path="add"
                    element={<AuthorForm />}
                />
            </Route>
            <Route path="*" element={<ErrorPage />}/>

            
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
