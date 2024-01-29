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

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" loader={authFormLoader} element={<AuthenticationPage />}>
                <Route index path="login" element={<LoginForm />} />
                <Route index path="register" element={<SignUpForm />} />
            </Route>
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
