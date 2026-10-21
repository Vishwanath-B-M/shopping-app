import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTocart, removeFromcart } from "../../store/slice/cartslice";
import { logout } from "../../store/autoslice/auto";
import { apiFetch } from "../../utils/api";
import { useState } from "react";

export default function SingleCate({ product }) {
  // hooks must run before any early return
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [message, setmessage] = useState("");

  if (!product) return null;

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

  async function RemoveFromCart() {
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

  const isitem = cart.some((cartitems) => cartitems?.productId === product?.id);

  return (
    <>
      <div
        className="flex flex-col max-h-[320px] lg:max-h-[400px] overflow-hidden items-center m-2 gap-2 border rounded-2xl shadow-xl 
hover:scale-105 transition-transform duration-500"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-[200px] lg:h-48 w-full"
        />

        <h3 className="w-16 truncate text-gray-700 font-bold text-sm lg:text-lg text-center p-2">
          {product.title}
        </h3>

        {message && <p className="text-xs text-red-800 text-center px-1">{message}</p>}

        <p className="text-gray-600 text-sm">{product.availabilityStatus}</p>

        <p className="text-gray-800 font-semibold text-sm lg:text-lg">${product.price}</p>

        <button
          onClick={() => (isitem ? RemoveFromCart() : HandleAddtoCart())}
          className="w-3/4 h-8 text-sm bg-white border rounded-xl shadow 
    hover:scale-105 transition mb-2"
        >
          {isitem ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </>
  );
}
