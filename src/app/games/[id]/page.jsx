"use client";
import React, { use } from "react";
import games from "../data.js";
import styles from "./product.module.css";
import { useCartStore } from "@/store/cartStore.js";

export default function ProductPage({ params }) {
    const { id } = use(params);
    const game = games.find((g) => g.id === parseInt(id));

    if (!game) {
        return <div>המוצר לא נמצא</div>;
    }
    const moreGames = games.filter((g) => g.id !== game.id);
    return (
        <main className={styles.container}>

            <div className={styles.product}>
                <img src={game.image} className={styles.image} />
                <h1 className={styles.title}>{game.name}</h1>
                <p className={styles.price}>₪{game.price}</p>
                <button className={styles.button} onClick={()=> useCartStore.getState().addItem(game)}>
                            הוסף לעגלה
                        </button>
            </div>

            <h2 className={styles.moreTitle}>מוצרים נוספים</h2>

            <div className={styles.grid}>
                {moreGames.map((item) => (
                    <a key={item.id} href={`/games/${item.id}`} className={styles.card}>
                        <img src={item.image} className={styles.smallImage} />
                        <h3>{item.name}</h3>
                        <p>₪{item.price}</p>
                    </a>
                ))}
            </div>
        </main>
    );
}
