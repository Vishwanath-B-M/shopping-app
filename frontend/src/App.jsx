
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Header from "./component/header";
import Login from "./pages/login";
import Category from "./pages/category";
import "./App.css";
import CategoryCard from "./pages/singlecategory";
import { apiFetch } from "./utils/api";
import { logout } from "./store/autoslice/auto";
import { addTocart, clearCart } from "./store/slice/cartslice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auto.token);

  // When the app opens (or the user logs in/out), load the saved cart
  // so the "Add to cart / Remove from cart" buttons are correct.
  useEffect(() => {
    if (!token) {
      dispatch(clearCart());
      return;
    }

    async function loadCart() {
      try {
        const res = await apiFetch("/api/cart/cartshow");
        if (res.status === 401) {
          dispatch(logout()); // token expired or invalid
          dispatch(clearCart());
          return;
        }
        const data = await res.json();
        dispatch(addTocart(data.cart?.cartitems || []));
      } catch (error) {
        console.log(error);
      }
    }

    loadCart();
  }, [token, dispatch]);

  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singlecategory/:slug" element={<CategoryCard />} />
      </Routes>
    </>
  );
}
export default App;
