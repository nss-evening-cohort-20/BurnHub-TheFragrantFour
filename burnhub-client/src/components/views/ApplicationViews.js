import { Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
        </Routes>
    )
};