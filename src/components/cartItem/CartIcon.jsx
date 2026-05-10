import { useCartStore } from "@/store/cartStore";
import styles from "./CartIcon.module.css";
import Link from "next/link";

export default function CartIcon() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

    return (
        <Link href="/cart" className={styles.cartIconContainer}>
            <i className="fa-solid fa-shopping-cart"></i>
            {totalItems > 0 && (
                <span className={styles.cartIconBadge}>
                    {totalItems}
                </span>
            )}
        </Link>
    );
}


