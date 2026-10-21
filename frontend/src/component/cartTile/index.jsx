import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromcart } from "../../store/slice/cartslice";
import { logout } from "../../store/autoslice/auto";
import { apiFetch } from "../../utils/api";
import { useState } from "react";

// onRemove(productId) is called after a successful delete so the
// cart page can remove the item from its own list.
export default function CartTile({ cartitem, onRemove }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setmessage] = useState("");

  async function RemoveHandle() {
    try {
      const res = await apiFetch("/api/cart/cartdelete", {
        method: "DELETE",
        body: JSON.stringify({ productId: cartitem.productId }),
      });

      if (res.status === 401) {
        dispatch(logout());
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setmessage(data.message || "Failed to remove item");
        return;
      }

      dispatch(removeFromcart(cartitem.productId));
      if (onRemove) onRemove(cartitem.productId);
    } catch (error) {
      console.error(error);
      setmessage("Something went wrong");
    }
  }

  return (
    <div>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <img
          src={Array.isArray(cartitem.Image) ? cartitem.Image[0] : cartitem.Image || ""}
          alt="Product"
          className="w-full h-[45vh] object-cover hover:scale-105 transition-transform duration-300"
        />

        <p className="text-2xl">Product ID: {cartitem.productId}</p>
        <p className="text-2xl">Quantity: {cartitem.quantity}</p>
        <p className="text-2xl">Price: ${cartitem.Price}</p>

        <div>
          <p className="text-sm">{message}</p>
          <button
            onClick={RemoveHandle}
            className="w-full h-10 text-sm border bg-white shadow-xl rounded-xl hover:scale-105 p-2 transition m-2"
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
}
