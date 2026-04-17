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
                        src="/logo-toys.png"
                        alt="TOYS Logo"
                        width={120}
                        height={60}
                        priority
                    />
                </Link>
            </div>

            <nav className={styles.links}>
                <Link href="/"><i class="fa-solid fa-house"></i></Link>
                <Link href="/games"><i class="fa-solid fa-dice"></i></Link>
                <Link href="/cart"><i class="fa-solid fa-shopping-cart"></i></Link>
                <Link href="/contact" className={styles.cta}>
                    צרו קשר
                </Link>
            </nav>
        </header>
    );
}

