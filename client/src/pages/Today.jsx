import { useEffect, useState } from "react";

export default function Today() {
    const [health, setHealth] = useState(null);

    useEffect(() => {
        fetch("/api/health")
            .then((r) => r.json())
            .then(setHealth)
            .catch(() => setHealth({ ok: false }));
    }, []);

    return (
        <div>
            <h3>Today</h3>
            <p>Generate today's plan here.</p>
        </div>
    );
}
