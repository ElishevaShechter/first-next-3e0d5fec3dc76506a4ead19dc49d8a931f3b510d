"use client";
import React, { useState } from "react";

import styles from "./cart.module.css";
import { useCartStore } from "@/store/cartStore.js";


export default function CartPage() {


    const items = useCartStore((state) => state.items);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);
    const removeItem = useCartStore((state) => state.removeItem);
    const total = useCartStore((state) => state.total());

    return (
        <div className={styles.cart}>
            <h1>העגלה שלך</h1>

            <div className={styles["cart-items"]}>
                {items.map((item) => (
                    <div key={item.id} className={styles["cart-item"]}>
                        <img src={item.image} width={80} />
                        <h3>{item.name}</h3>
                        <p>₪{item.price}</p>

                        <div className={styles["cart-qty"]}>
                            <button onClick={() => decreaseQty(item.id)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                        </div>

                        <button onClick={() => removeItem(item.id)}>מחק</button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>סיכום הזמנה</h3>
                <p>סה״כ לתשלום: <strong>₪{total}</strong></p>
            </div>
        </div>
    );
}


