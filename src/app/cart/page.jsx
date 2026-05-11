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

    // Get product suggestions (exclude items already in cart)
    const cartItemIds = cartItems.map(item => item.id);
    const suggestions = games.filter(game => !cartItemIds.includes(game.id)).slice(0, 4);


    return (
        <div className={styles.cart}>
            {/* Header */}
            <header className={styles["cart-header"]}>
                <h1 className={styles["cart-title"]}>העגלה שלך</h1>
                <p className={styles["cart-subtitle"]}>
                    {cartItems.length > 0
                        ? `${cartItems.length} מוצר${cartItems.length === 1 ? '' : 'ים'} בעגלה`
                        : 'העגלה שלך ריקה'
                    }
                </p>
            </header>

            {cartItems.length === 0 ? (
                /* Empty Cart */
                <div className={styles["cart-empty"]}>
                    <h3>העגלה שלך ריקה</h3>
                    <p>הוסף מוצרים לעגלה כדי להתחיל בקניות</p>
                    <Link href="/games" className={styles["cart-empty-btn"]}>
                        חזור לחנות
                    </Link>
                </div>
            ) : (
                <>
                    {/* Cart Content */}
                    <div className={styles["cart-content"]}>
                        {/* Items List */}
                        <section className={styles["cart-items-section"]}>
                            <div className={styles["cart-items-header"]}>
                                <h3>פריטים בעגלה</h3>
                            </div>
                            <div className={styles["cart-items-list"]}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles["cart-item"]}>
                                        <Link href={`/games/${item.id}`}>
                                            <img
                                                src={item.image}
                                                className={styles["cart-item-image"]}
                                                alt={item.name}
                                            />
                                        </Link>
                                        <div className={styles["cart-item-content"]}>
                                            <div className={styles["cart-item-info"]}>
                                                <Link href={`/games/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <h3>{item.name}</h3>
                                                </Link>
                                                <p className={styles["cart-item-price"]}>₪{item.price}</p>
                                            </div>
                                            <div className={styles["cart-item-actions"]}>
                                                <div className={styles["cart-qty"]}>
                                                    <button onClick={() => decreaseQty(item.id)}>-</button>
                                                    <span>{item.qty}</span>
                                                    <button onClick={() => increaseQty(item.id)}>+</button>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className={styles["cart-remove"]}>
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Sidebar */}
                        <aside className={styles["cart-sidebar"]}>
                            <div className={styles["cart-summary-header"]}>
                                <h3>סיכום הזמנה</h3>
                            </div>

                            <div className={styles["cart-summary-row"]}>
                                <span className={styles["cart-summary-label"]}>סה״כ פריטים</span>
                                <span className={styles["cart-summary-value"]}>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
                            </div>

                            <div className={styles["cart-summary-divider"]}></div>

                            <div className={`${styles["cart-summary-row"]} ${styles["cart-total-row"]}`}>
                                <span className={styles["cart-total-label"]}>סה״כ לתשלום</span>
                                <span className={styles["cart-total-value"]}>₪{totalAmount}</span>
                            </div>

                            <button className={styles["cart-checkout-btn"]}>
                                המשך לתשלום
                            </button>
                        </aside>
                    </div>

                    {/* Product Suggestions */}
                    {suggestions.length > 0 && (
                        <section className={styles["suggestions"]}>
                            <div className={styles["suggestions-header"]}>
                                <h3>מוצרים שאולי יעניינו אותך</h3>
                                <p>גלה מוצרים נוספים מהחנות שלנו</p>
                            </div>
                            <div className={styles["suggestions-grid"]}>
                                {suggestions.map((game) => (
                                    <Link key={game.id} href={`/games/${game.id}`} className={styles["suggestion-item"]}>
                                        <img src={game.image} alt={game.name} className={styles["suggestion-image"]} />
                                        <div className={styles["suggestion-content"]}>
                                            <h4>{game.name}</h4>
                                            <p>₪{game.price}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
