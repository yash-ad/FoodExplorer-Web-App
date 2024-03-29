import { useSelector, useDispatch } from "react-redux";
import CartList from "./CartList";
import { clearCart } from "../utilities/cartSlice";
import EmptyCart from "./EmptyCart";

const CartStore = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalQuantity = cartItems.reduce((totalQty, item) => totalQty + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((totalQty, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return totalQty + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
              <span id="trash-bin" className="material-symbols-outlined">
                delete
              </span>
            </button>
            <CartList items={cartItems} />
            <div className="total-price-quantity">
              <span className="styles_mainTitle__2eRLR">{totalQuantity} Items | ₹{totalPrice / 100}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartStore;
