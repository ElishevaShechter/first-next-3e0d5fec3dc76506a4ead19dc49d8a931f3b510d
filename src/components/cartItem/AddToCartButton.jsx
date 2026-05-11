"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "../../store/cartStore";

export default function AddToCartButton({ product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);

    toast.success(
      (t) => (
        <div>
          <p>Added successfully</p>
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
              toast.dismiss(t.id);
            }}
            className="underline text-blue-600"
          >
            Go to cart
          </button>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };

  return (
    <button onClick={handleAdd}>
      הוסף לעגלה
    </button>
  );
}

