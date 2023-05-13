import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { NavBar } from "../nav/NavBar";
import { ProductForm } from "../productForm/ProductForm";
import { AllStores } from "../myStore/AllStores";
import { StoreDetail } from "../myStore/StoreDetail";
import { Items } from "../item/Items";
import { ItemDetail } from "../item/ItemDetail";
import { Profile } from "../profile/Profile";
import { Filter } from "../filters/Filter";
import { Cart } from "../cart/Cart";

export const ApplicationViews = () => {
    const localUser = localStorage.getItem("user")
    const currentUser = JSON.parse(localUser)

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
            <Route path="/" element={ <Home /> } />
            <Route path="stores" element={<AllStores />} />
            <Route path="stores/search/:searchCriterion" element={<AllStores />} />
            <Route path="stores/:storeId" element={<StoreDetail />} /> 
            <Route path="Items" element={<Items />} />
            <Route path="items/search/:searchCriterion" element={<Items />} />
            <Route path="items/:itemId" element={<ItemDetail />} />
            <Route path="filters" element={<Filter />} />

            {
                currentUser
                    ? <>
                        <Route path="cart" element={<Cart />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/:userId" element={<Profile />} />
                    </>
                    : ""
            }

            {
                currentUser && currentUser.isSeller
                    ? <>
                        <Route path="ProductForm" element={<ProductForm />} />
                    </>
                    : ""
            }
            
            </Route>
        </Routes>
    )
};