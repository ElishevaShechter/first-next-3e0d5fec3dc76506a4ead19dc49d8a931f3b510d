"use client";

import React from "react";
import Link from "next/link";
import games from "../games/data.js";
import styles from "./cart.module.css";
import { useCartStore } from "../../store/cartStore.js";


export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const removeItem = useCartStore((s) => s.removeItem);
    const total = useCartStore((s) => s.total);


    const cartItems = Array.isArray(items) ? items : [];
    const totalAmount = typeof total === "function" ? total() : 0;


    return (
        <div className={styles.cart}>
            <h1>העגלה שלך</h1>

            <div className={styles["cart-items"]}>
                {cartItems.length === 0 ? (
                    <p>העגלה ריקה.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className={styles["cart-item"]}>
                            <img src={item.image} width={80} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>₪{item.price}</p>

                            <div className={styles["cart-qty"]}>
                                <button onClick={() => decreaseQty(item.id)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => increaseQty(item.id)}>+</button>
                            </div>

                            <button onClick={() => removeItem(item.id)}>מחק</button>
                        </div>
                    ))
                )}
            </div>

            <div className={styles["cart-summary"]}>
                <h3>סיכום הזמנה</h3>
                <p>
                    סה״כ לתשלום: <strong>₪{totalAmount}</strong>
                </p>
            </div>


        </div>
    );
}
