import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.container}>

      {/* לוגו רקע ענק */}
      <Image
        src="/logo-toys.png"
        alt="TOYS Background Logo"
        className={styles.backgroundLogo}
        width={600}
        height={600}
      />



      {/* אזור מרכזי */}
      <section className={styles.hero}>
        <h1>ברוכים הבאים ל־TOYS 🎮</h1>
        <p>העולם שבו כל משחק מתחיל</p>

        <div className={styles.buttons}>
          <a href="/games" className={styles.btn}>🎮 משחקים חדשים</a>
          <a href="/popular" className={styles.btn}>⭐ פופולרים</a>
          <a href="/sale" className={styles.btn}>🔥 מבצעים</a>
        </div>
      </section>
      <div className={styles.floatingElements}>
        <span className={styles.star}>⭐</span>
        <span className={styles.star}>✨</span>
        <span className={styles.controller}>🎮</span>
        <span className={styles.block}>🧱</span>
        <span className={styles.ball}>🟢</span>
      </div>


    </div>
  );
}

