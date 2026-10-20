

import { useDispatch } from 'react-redux';
import { removeFromcart } from '../../store/slice/cartslice';
import { useState } from 'react';

export default function CartTile({ cartitem }) {
  const dispatch = useDispatch();
  const [message, setmessage] = useState('');

  async function RemoveHandle() {
    try {
      const res = await fetch(
        'http://localhost:3000/api/cart/cartdelete',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            productId: cartitem.productId,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setmessage(data.message || 'Failed to remove item');
        return;
      }

      setmessage(data.message || 'Item removed successfully');

      // Update the Redux store after successful deletion
      dispatch(removeFromcart(cartitem.productId));
    } catch (error) {
      console.error(error);
      setmessage('Something went wrong');
    }
  }

  return (
    <div>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <img
          src={
            Array.isArray(cartitem.Image)
              ? cartitem.Image[0]
              : cartitem.Image || ''
          }
          alt="Product"
          className="w-full h-[45vh] object-cover hover:scale-105 transition-transform duration-300"
        />

        <p className="text-2xl">
          Product ID: {cartitem.productId}
        </p>

        <p className="text-2xl">
          Quantity: {cartitem.quantity}
        </p>

        <p className="text-2xl">
          Price: ${cartitem.Price}
        </p>

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
