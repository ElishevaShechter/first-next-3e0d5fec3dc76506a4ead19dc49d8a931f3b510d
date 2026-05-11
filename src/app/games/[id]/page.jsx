"use client";
import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import games from "../data.js";
import styles from "./product.module.css";
import { useCartStore } from "@/store/cartStore.js";

export default function ProductPage({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const game = games.find((g) => g.id === parseInt(id, 10));
    const addItem = useCartStore((state) => state.addItem);

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
                <button
                    className={styles.button}
                    onClick={() => {
                        addItem(game);
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
                            { duration: 3000 }
                        );
                    }}
                >
                    הוסף לעגלה
                </button>
            </div>

            <h2 className={styles.moreTitle}>עוד מוצרים שיכולים לעניין אותך </h2>

            <div className={styles.grid}>
                {moreGames.map((item) => (
                    <Link key={item.id} href={`/games/${item.id}`} className={styles.card}>
                        <img src={item.image} className={styles.smallImage} />
                        <h3>{item.name}</h3>
                        <p>₪{item.price}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
