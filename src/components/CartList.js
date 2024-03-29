// CartList component
import { useDispatch } from "react-redux";
import { IMG_URL } from "../utilities/config";
import { addItem, removeItem, decrementQty} from "../utilities/cartSlice";
import { useState } from "react";

const CartList = ({ items }) => {
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch();

  const handleLessItem = (item) => {
    setItemCounts((prevCounts)=>{
      const updatedCounts = { ...prevCounts };
      updatedCounts[item.card.info.id] = updatedCounts[item.card.info.id] - 1;
      dispatch(decrementQty({ id: item.card.info.id }))
      return updatedCounts;
    })
  };

  const handleAddItem = (item) => {
    setItemCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[item.card.info.id] = (updatedCounts[item.card.info.id] || 0) + 1;
      dispatch(addItem(item));
      return updatedCounts;
    });
  };

  return (
    <div>
      <div>
        {items?.map((item) => (
          <div key={item.card.info.id} className="cart-menu">
            <div className="cart-menu-left">
              <h3 className="font-bold text-lg">{item.card.info.name}</h3>
              <p>{item.card.info.description}</p>
              <p className="cart-menu-price">
                ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}
              </p>
            </div>
            <div className="cart-menu-right">
              <img src={IMG_URL + item.card.info.imageId} alt="Item" />
              <div className="menu-right">
                <div>
                  <button onClick={() => handleLessItem(item)}>-</button>
                  {itemCounts[item.card.info.id] > 0 && itemCounts[item.card.info.id]}
                  <button onClick={() => handleAddItem(item)} id="addBtn">+</button>
                </div>
              </div>
            </div>
            <div className="cart-menu-crossButton">
              <div className="buttons">
                <button onClick={() =>  dispatch(removeItem({ id: item.card.info.id }))}>
                <span class="material-symbols-outlined">
close
</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
