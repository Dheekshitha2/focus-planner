import express from "express";
import cors from "cors";
import "dotenv/config";
import { supabase } from "./supabaseClient.js";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "focus-planner-api" }));

// GET all topics
app.get("/topics", async (req, res) => {
    const { data, error } = await supabase
        .from("topics")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
});

//POST create topics
app.post("/topics", async (req, res) => {
    const { name, importance, confidence, minutes_per_session } = req.body;

    // Basic validation
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "name is required (string)" });
    }
    if (typeof importance !== "number" || importance < 1 || importance > 5) {
        return res.status(400).json({ error: "importance must be a number between 1 and 5" });
    }
    if (typeof confidence !== "number" || confidence < 0 || confidence > 100) {
        return res.status(400).json({ error: "confidence must be a number between 0 and 100" });
    }

    const payload = {
        name: name.trim(),
        importance,
        confidence,
        minutes_per_session: typeof minutes_per_session === "number" ? minutes_per_session : 25,
    };

    const { data, error } = await supabase
        .from("topics")
        .insert(payload)
        .select("*")
        .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
