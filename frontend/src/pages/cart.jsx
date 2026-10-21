import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartTile from "../component/cartTile";
import { apiFetch } from "../utils/api";

export default function Cart() {
  const [cart, setcart] = useState([]);
  const [message, setmessage] = useState("");

  useEffect(() => {
    async function cartshowing() {
      try {
        const res = await apiFetch("/api/cart/cartshow");

        if (res.status === 401) {
          setmessage("Please login to see your cart");
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          setmessage(data.message || "Could not load cart");
          return;
        }

        setcart(data.cart?.cartitems || []);
      } catch (error) {
        console.log(error);
        setmessage(error.message);
      }
    }
    cartshowing();
  }, []);

  // remove the item from this page's list right after the server deletes it
  function handleRemoved(productId) {
    setcart((items) => items.filter((item) => item.productId !== productId));
  }

  // total is calculated from the list, so it updates when items are removed
  const Price = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);
  const needsLogin = message.includes("login");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
      <div className="flex flex-col items-center justify-center ">
        {cart.length ? (
          <div className="min-h-screen flex flex-col items-center justify-center">
            {cart.map((cartitem) => (
              <CartTile
                key={cartitem._id || cartitem.productId}
                cartitem={cartitem}
                onRemove={handleRemoved}
              />
            ))}
            <h1 className="text-2xl lg:text-4xl"> your cart summary</h1>
            <p>
              <span className="text-2xl lg:text-4xl"> total item: <span> {cart.length}</span> </span><br></br>
              <span className="text-2xl lg:text-4xl mb-2">total price:{Price.toFixed(2)}$</span>
            </p>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl"> cart is empty </h1>
            {message && <p className="text-2xl mt-2">{message}</p>}
            <Link to={needsLogin ? "/login" : "/"}>
              <button
                className="w-32 h-16 text-black text-2xl bg-white/40  border border-black/40 shadow-lg  hover:backdrop-blur-2xl hover:text-3xl 
        lg:w-72 h-25 gap-2 text-black lg:text-4xl lg:border-4 rounded-2xl lg:hover:text-5xl"
              >
                {needsLogin ? "login" : "shop now"}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
