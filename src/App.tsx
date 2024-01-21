import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
