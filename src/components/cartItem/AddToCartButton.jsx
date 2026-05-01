import { useCartStore } from "../store/cartStore";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button onClick={() => addItem(product)}>
      הוסף לעגלה
    </button>
  );
}
