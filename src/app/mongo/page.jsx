"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const initialForm = {
    name: "",
    price: "",
    image: "",
};

export default function MongoAdminPage() {
    const [games, setGames] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            const response = await fetch("/api/games", { cache: "no-store" });
            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.details || errorData.error || errorMessage;
                } catch (e) {
                    // Response body is not JSON, use status message
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error("Failed to load games:", error);
            // Fallback to local data when MongoDB is not available
            try {
                const localGames = await import("../games/data.js");
                setGames(localGames.default.map(game => ({ ...game, _id: game.id })));
                setStatus("Using local data - MongoDB connection failed. Configure MongoDB Atlas to enable database operations.");
            } catch (localError) {
                setStatus(`Failed to load games: ${error.message}`);
            }
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }

    async function handleSave(event) {
        event.preventDefault();
        const payload = {
            name: form.name.trim(),
            price: Number(form.price),
            image: form.image.trim(),
        };

        if (!payload.name || !payload.price) {
            setStatus("Please enter a name and price.");
            return;
        }

        if (editingId) {
            try {
                const response = await fetch(`/api/games/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const updated = await response.json();
                    setGames((current) => current.map((item) => (item._id === editingId ? updated : item)));
                    setStatus("Game updated successfully.");
                    setEditingId(null);
                    setForm(initialForm);
                } else {
                    let errorMessage = "Unable to update game.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.details || errorData.error || errorMessage;
                    } catch (e) {
                        // Response body is not JSON
                    }
                    setStatus(`Unable to update game: ${errorMessage}. Configure MongoDB Atlas to enable database operations.`);
                }
            } catch (error) {
                console.error("Failed to update game:", error);
                setStatus(`Failed to update game: ${error.message}`);
            }
        } else {
            try {
                const response = await fetch("/api/games", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const created = await response.json();
                    setGames((current) => [created, ...current]);
                    setStatus("Game created successfully.");
                    setForm(initialForm);
                } else {
                    let errorMessage = "Unable to create game.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.details || errorData.error || errorMessage;
                    } catch (e) {
                        // Response body is not JSON
                    }
                    setStatus(`Unable to create game: ${errorMessage}. Configure MongoDB Atlas to enable database operations.`);
                }
            } catch (error) {
                console.error("Failed to create game:", error);
                setStatus(`Failed to create game: ${error.message}`);
            }
        }
    }

    async function handleEdit(game) {
        setEditingId(game._id);
        setForm({ name: game.name, price: String(game.price), image: game.image || "" });
        setStatus("");
    }

    async function handleDelete(id) {
        if (!confirm("Delete this game?")) {
            return;
        }

        try {
            const response = await fetch(`/api/games/${id}`, { method: "DELETE" });
            if (response.ok) {
                setGames((current) => current.filter((game) => game._id !== id));
                setStatus("Game deleted successfully.");
                if (editingId === id) {
                    setEditingId(null);
                    setForm(initialForm);
                }
            } else {
                let errorMessage = "Unable to delete game.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.details || errorData.error || errorMessage;
                } catch (e) {
                    // Response body is not JSON
                }
                setStatus(`Unable to delete game: ${errorMessage}. Configure MongoDB Atlas to enable database operations.`);
            }
        } catch (error) {
            console.error("Failed to delete game:", error);
            setStatus(`Failed to delete game: ${error.message}`);
        }
    }

    function handleCancel() {
        setEditingId(null);
        setForm(initialForm);
        setStatus("");
    }

    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <div>
                    <h1>MongoDB Games CRUD</h1>
                    <p>Manage the <strong>main.games</strong> collection from Atlas.</p>
                    <p className={styles.note}>
                        <strong>Note:</strong> If you see "Using local data" below, MongoDB Atlas is not configured.
                        Add your IP address to MongoDB Atlas Network Access to enable database operations.
                    </p>
                </div>
                <div className={styles.status}>{status}</div>
            </section>

            <section className={styles.formCard}>
                <h2>{editingId ? "Edit game" : "Add new game"}</h2>
                <form onSubmit={handleSave} className={styles.form}>
                    <label className={styles.field}>
                        <span>Name</span>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Game name"
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Price</span>
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="₪ price"
                            type="number"
                            min="0"
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Image URL</span>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="/image.png or https://..."
                        />
                    </label>
                    <div className={styles.actions}>
                        <button type="submit" className={styles.primaryButton}>
                            {editingId ? "Update game" : "Create game"}
                        </button>
                        {editingId && (
                            <button type="button" className={styles.secondaryButton} onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className={styles.listCard}>
                <div className={styles.listHeader}>
                    <h2>Games in MongoDB</h2>
                    <span>{games.length} item{games.length === 1 ? "" : "s"}</span>
                </div>

                {games.length === 0 ? (
                    <p className={styles.empty}>No games found yet.</p>
                ) : (
                    <div className={styles.table}>
                        {games.map((game) => (
                            <div key={game._id} className={styles.row}>
                                <div className={styles.gameInfo}>
                                    <div className={styles.preview}>
                                        {game.image ? <img src={game.image} alt={game.name} /> : <span>No image</span>}
                                    </div>
                                    <div>
                                        <strong>{game.name}</strong>
                                        <p>Price: ₪{game.price}</p>
                                        <p className={styles.mono}>ID: {String(game._id)}</p>
                                    </div>
                                </div>
                                <div className={styles.rowActions}>
                                    <button onClick={() => handleEdit(game)} className={styles.editButton}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(game._id)} className={styles.deleteButton}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
