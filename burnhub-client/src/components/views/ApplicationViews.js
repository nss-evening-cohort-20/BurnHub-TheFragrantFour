import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { NavBar } from "../nav/NavBar";
import { ProductForm } from "../productForm/ProductForm";
import { Items } from "../item/Items";
import { ItemDetail } from "../item/ItemDetail";
import { Profile } from "../profile/Profile";
import { Filter } from "../filters/Filter";

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
            <Route path="ProductForm" element={<ProductForm />} />
            <Route path="Items" element={<Items />} />
            <Route path="items/:itemId" element={<ItemDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="filters" element={<Filter />} />
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