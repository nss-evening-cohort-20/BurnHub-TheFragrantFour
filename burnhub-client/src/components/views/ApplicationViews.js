import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { NavBar } from "../nav/NavBar";

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
            <Route path="/" element={ <Home /> } />
            {/* <Route path="/store" element={ <Store /> } />
            <Route path="/" element={ <ItemPage /> } />
            <Route path="/" element={ <ViewStores /> } /> */}

            {/* user.Seller
            ? <>
                <Route path="/store" element={ <MyStore /> } />
            </>

            : <>
                
            </> */}

            



            </Route>
        </Routes>
    )
};