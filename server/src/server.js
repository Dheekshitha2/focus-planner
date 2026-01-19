import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "focus-planner-api" }));

// placeholder routes (to swap to supabase later)
app.get("/topics", (req, res) => res.json([]));
app.post("/topics", (req, res) => res.status(201).json({ message: "todo" }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
