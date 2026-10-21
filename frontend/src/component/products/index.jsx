
// Put this in the same place as your current ProductTile file
// (the one imported as "../component/products" from home.jsx).
// If your file is component/products.jsx, change the imports to "../store/..." and "../utils/api".
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTocart, removeFromcart } from "../../store/slice/cartslice";
import { logout } from "../../store/autoslice/auto";
import { apiFetch } from "../../utils/api";
import { useState } from "react";

export default function ProductTile({ product }) {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.cart);

  async function HandleAddtoCart() {
    try {
      const res = await apiFetch("/api/cart/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: product.id,
          quantity: "1",
          Price: product.price,
          Image: product.images,
        }),
      });

      if (res.status === 401) {
        dispatch(logout());
        setmessage("Please login first");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setmessage(data.message);

      if (!res.ok) return;

      dispatch(addTocart(data.cart.cartitems));
    } catch (error) {
      console.error(error);
      setmessage("Failed to add product");
    }
  }

  async function RemoveHandle() {
    try {
      const res = await apiFetch("/api/cart/cartdelete", {
        method: "DELETE",
        body: JSON.stringify({ productId: product.id }),
      });

      if (res.status === 401) {
        dispatch(logout());
        setmessage("Please login first");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setmessage(data.message);

      if (res.ok) {
        dispatch(removeFromcart(product.id));
      }
    } catch (error) {
      console.error(error);
      setmessage("Failed to remove product");
    }
  }

  const isitem = items.some((cartitems) => cartitems?.productId === product?.id);

  return (
    <div>
      <div
        className="flex flex-col max-h-[400px] w-full items-center justify-between 
border-2 border-black mt-2 gap-2 rounded-2xl shadow-xl 
hover:scale-105 transition-transform duration-500 overflow-hidden"
      >
        <img src={product.images[0]} alt={product.title} className="object-cover h-48 w-full" />

        <h1 className="w-40 truncate text-gray-700 font-bold text-lg text-center">
          {product.title}
        </h1>
        {message && <p className="text-xs text-red-800 text-center px-2">{message}</p>}

        <h4 className="text-gray-600 text-sm">{product.availabilityStatus}</h4>

        <h4 className="text-gray-800 text-lg font-semibold">${product.price}</h4>

        <div className="w-full flex justify-center px-2 pb-2">
          <button
            onClick={() => (isitem ? RemoveHandle() : HandleAddtoCart())}
            className="w-full lg:w-1/2 h-10 text-sm bg-white border rounded-xl shadow 
      hover:scale-105 transition"
          >
            {isitem ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
