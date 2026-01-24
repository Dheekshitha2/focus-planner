import { useEffect, useState } from "react";
import "./Topics.css"

export default function Topics() {

    // State variables
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();

    // Form state
    const [name, setName] = useState("");
    const [importance, setImportance] = useState(3);
    const [confidence, setConfidence] = useState(50);
    const [minutes, setMinutes] = useState(25);


    // Fetch topics from api
    async function loadTopics() {
        setLoading(true);
        setErr("");
        try {
            const res = await fetch("/api/topics");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load topics");
            setTopics(data);
        } catch (e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    }

    // Auto load when page opens
    useEffect(() => {
        loadTopics();
    }, []);


    async function addTopic(e) {
        e.preventDefault(); // Stops browser from refreshing page on form submit
        setErr("");
        try {
            const res = await fetch("/api/topics", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name,
                    importance: Number(importance),
                    confidence: Number(confidence),
                    minutes_per_session: Number(minutes),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add topic");

            // optimistic prepend
            setTopics((prev) => [data, ...prev]);
            setName("");
            setImportance(3);
            setConfidence(50);
        } catch (e) {
            setErr(e.message);
        }
    }

    return (
        <div className="topics-page">
            <h3>Topics</h3>
            <form onSubmit={addTopic} className="topic-form">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Topic name (e.g. Trees: BFS)"
                />
                <label>
                    Importance (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                    />
                </label>

                <label>
                    Confidence (0-100):
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={confidence}
                        onChange={(e) => setConfidence(e.target.value)}
                    />
                </label>

                <label>
                    Minutes/session:
                    <input
                        type="number"
                        min="5"
                        max="240"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                    />
                </label>

                <button className="primary-btn" type="submit">Add Topic</button>
                {err && <p className="error-text">{err}</p>}
            </form>

            <hr className="divider" />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="topic-list">
                    {topics.map((t) => (
                        <li key={t.id}>
                            <b>{t.name}</b> — importance {t.importance}, confidence {t.confidence}, {" "}
                            {t.minutes_per_session} min
                        </li>
                    ))}
                </ul>
            )}

            <button className="refresh-btn" onClick={loadTopics}>
                Refresh
            </button>
        </div>
    );
}
