# focus-planner (NOTE: work in progress)


A study planner with an **adaptive daily load** that helps you make consistent progress without burning out.  
You add topics with **importance** and **confidence**, set a **daily cap**, and Focus Planner generates a **daily plan** prioritising what you should review first. It also supports an **end-of-day reflection** to update confidence and keep future plans adaptive.

## Features

- **Topics tracking**
  - Add topics with **importance/weight** and **confidence**
- **Daily cap**
  - Set a daily study limit (e.g., **60 minutes**)
- **Smart daily plan generation**
  - Generates a plan within your daily cap
  - Prioritises **overdue** topics and **low-confidence** topics first
- **AI assistance (OpenAI API)**
  - Generates a **daily plan** and/or **summary** (depending on configuration)

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express.js
- **Database:** Supabase (Postgres)
- **Deployment:**
  - Frontend: Vercel
  - Backend: Fly.io
- **AI:** OpenAI API (plan generation + summaries)

## Architecture

- React client calls the Express API
- Express API handles:
  - topic + plan logic
  - database reads/writes via Supabase
  - OpenAI API calls (keeps API keys on the server)
- Supabase stores topics, plans, and reflection data

## Getting Started (Local)

### 1) Clone the repo
```bash
git clone <your-repo-url>
cd focus-planner
