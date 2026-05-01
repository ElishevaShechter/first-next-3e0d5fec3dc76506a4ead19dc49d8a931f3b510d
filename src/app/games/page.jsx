"use client";
import React from "react";
import { useCartStore } from "@/store/cartStore.js";
import games from "./data";
import Image from "next/image";
import styles from "./games.module.css";
import Link from "next/link";
export default function GamesPage() {
    

    return (
        <main className={styles.container}>
            {/* לוגו רקע ענק */}
            <Image
                src="/logo-toys.png"
                alt="TOYS Background Logo"
                className={styles.backgroundLogo}
                width={600}
                height={600}
            />
            <h1 className={styles.title}>🎮 משחקים</h1>

            <div className={styles.grid}>
                {games.map((game) => (
                    <div key={game.id} className={styles.card}>
                        <Link href={`/games/${game.id}`}>    
                            <img src={game.image} alt={game.name} className={styles.image} />

                            <h3 className={styles.name}>{game.name}</h3>
                            <p className={styles.price}>₪{game.price}</p>
                        </Link>
                        <button className={styles.button} onClick={()=> useCartStore.getState().addItem(game)}>
                            הוסף לעגלה
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
