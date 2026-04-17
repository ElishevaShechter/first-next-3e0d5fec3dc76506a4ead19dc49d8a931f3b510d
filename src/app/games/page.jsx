import games from "./data";
import Image from "next/image";
import styles from "./games.module.css";

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
                    <a key={game.id} href={`/games/${game.id}`} className={styles.card}>    
                        <img src={game.image} alt={game.name} className={styles.image} />

                        <h3 className={styles.name}>{game.name}</h3>
                        <p className={styles.price}>₪{game.price}</p>

                        <button className={styles.button}>הוסף לעגלה</button>
                    </a>
                ))}
            </div>
        </main>
    );
}
