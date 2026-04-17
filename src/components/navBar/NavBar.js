"use client";
import Link from 'next/link';
import { useState } from 'react';



import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        src="/Copilot_20260417_102723.png"
                        alt="TOYS Logo"
                        width={120}
                        height={60}
                        priority
                    />
                </Link>
            </div>

            <nav className={styles.links}>
                <Link href="/">בית</Link>
                <Link href="/games">משחקים</Link>
                <Link href="/cart">עגלה</Link>
                <Link href="/contact" className={styles.cta}>
                    צרו קשר
                </Link>
            </nav>
        </header>
    );
}

