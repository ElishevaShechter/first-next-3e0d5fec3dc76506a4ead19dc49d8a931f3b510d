
import { useCartStore } from "../../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const total = useCartStore((state) => state.total());

  return (
    <div className="cart">
      <div className="cart-header">
        <h2 className="cart-title">העגלה שלך</h2>
        <span className="cart-count">{items.length} פריטים</span>
      </div>

      {items.length === 0 && <p>העגלה ריקה</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img className="cart-item-image" src={item.image} alt={item.name} />

          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-meta">₪{item.price}</div>
          </div>

          <div className="cart-item-actions">
            <div className="cart-qty">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            <button className="cart-remove" onClick={() => removeItem(item.id)}>
              הסר
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-footer">
          <div>
            <div className="cart-total-label">סך הכל</div>
            <div className="cart-total-value">₪{total}</div>
          </div>

          <button className="cart-checkout-btn">לתשלום</button>
        </div>
      )}
    </div>
  );
}
