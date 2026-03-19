# EasyPass DMV Practice Tracker

**Author**: _Your Name Here_  
**Class link**: _Paste your class / assignment link here_  

Client-side rendered React app (hooks) + Node/Express + MongoDB. Users can practice DMV-style questions, track attempts, save questions to favorites/mistakes, and browse/filter the full question bank by topic and difficulty.

---

## Project objective

- Help learners **focus practice** by topic/difficulty.
- Track performance over time via **attempt history**.
- Provide lightweight “study lists” via **Favorites** and **Mistake Notebook**.

---

## Screenshot

Add a screenshot here after you capture one:

- `docs/screenshot.png`

---

## Deployed app

- **Frontend (Vercel)**: `https://easypass-dmv-practice-tracker.vercel.app`  
- **Backend (Render)**: `https://easypass-dmv-practice-tracker.onrender.com`

---

## How to use (for end users)

- **Browse**: Go to **Browse** in the navbar to filter questions by **Topic** and **Difficulty** (and search by text).
- **Quiz**: Practice questions one at a time; results show correct/incorrect.
- **Save**: Add the current quiz question to **Favorites** or **Mistakes**.
- **Review**: Open **Saved**, **Favorites**, or **Mistakes** to review, delete, and mark items as reviewed.
- **History**: See your attempt history.

---

## Tech stack

- **Frontend**: React (hooks), React Router, Bootstrap, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (native driver)

---

## Database & collections (MongoDB)

Database name: `easypass` (see `server/config/db.js`)

Collections used:

- **`questions`**: question bank (seeded with synthetic data; 1000+ records).
- **`savedQuestions`**: saved items (favorites/mistakes) with notes and review status.
- **`attempts`**: quiz attempt history.

Seed script:

- `server/seedQuestions.js` generates **1000** synthetic questions and inserts into `questions`.

---

## API overview (AJAX)

Base URL:

- In production set `VITE_API_BASE_URL` on the frontend, or rely on default in `client/src/services/config.js`.

Questions:

- `GET /api/questions/random` — get a random question
- `GET /api/questions` — list questions with filters + pagination  
  - query: `topic`, `difficulty`, `q`, `page`, `limit`
- `GET /api/questions/meta` — topics/difficulties for filter UI

Saved Questions:

- `GET /api/saved-questions`
- `POST /api/saved-questions`
- `DELETE /api/saved-questions/:id`
- `PUT /api/saved-questions/:id/review`

Attempts:

- `GET /api/attempts`
- `POST /api/attempts`

---

## React components (hooks)

Examples (each in its own file):

- `client/src/components/Navbar/Navbar.jsx`
- `client/src/components/SavedQuestionCard/SavedQuestionCard.jsx`
- `client/src/pages/QuizPage/QuizPage.jsx`
- `client/src/pages/QuestionBrowserPage/QuestionBrowserPage.jsx`

---

## Project structure

```
client/                 # React frontend (Vite)
  src/
    components/         # Reusable UI components (+ per-component CSS)
    pages/              # Route pages
    services/           # AJAX helpers (fetch)

server/                 # Express backend
  routes/               # Express routers
  config/               # DB connection config
  seedQuestions.js      # Generates 1000 synthetic questions
```

CSS organization:

- Component/page styles live alongside the component/page (e.g. `Navbar.jsx` + `Navbar.css`).

---

## Setup instructions (build & run locally)

### Prerequisites

- Node.js (recommend latest LTS)
- MongoDB connection string (MongoDB Atlas or local MongoDB)

### 1) Backend

From `server/`:

1. Install deps:

```bash
cd server
npm install
```

2. Create environment variables:

- Create `server/.env` (do **not** commit it)
- Add:

```bash
MONGO_URI="your-mongodb-connection-string"
PORT=4000
```

3. Start the server:

```bash
node server.js
```

### 2) Seed the database (1000 synthetic questions)

```bash
cd server
node seedQuestions.js
```

### 3) Frontend

From `client/`:

1. Install deps:

```bash
cd client
npm install
```

2. (Optional) Point frontend to your local backend:

```bash
VITE_API_BASE_URL="http://localhost:4000"
```

3. Start the dev server:

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## ESLint / Prettier

- Frontend ESLint: `client/eslint.config.js`  
  - Run: `cd client && npm run lint`
- Prettier is installed in `server` (`server/package.json`).  
  - If you want formatting scripts, add `format` / `check-format` scripts (recommended).

---

## Design document (rubric)

### Project description

EasyPass is a DMV practice tracker that makes it easy to:

- Practice randomized questions
- Save questions into Favorites / Mistakes for later review
- Track attempt history over time
- Browse and filter the full question bank by topic and difficulty

### User personas

1) **Busy commuter (Alex, 24)**  
Needs short, focused practice sessions on weak areas (e.g., “Traffic Signals”, “Hard”).

2) **First-time driver (Mei, 17)**  
Wants repetition and a simple mistake notebook to review common errors.

3) **Test retaker (Jordan, 31)**  
Wants to measure progress, review past attempts, and drill topics that caused failure.

### User stories

- As a learner, I want to **browse and filter questions by topic and difficulty** so I can focus on a specific area.
- As a learner, I want to **practice a random question** so I can simulate exam conditions.
- As a learner, I want to **save a question as a favorite** so I can review it later.
- As a learner, I want to **save questions I missed** so I can build a mistake notebook.
- As a learner, I want to **see my attempt history** so I can measure improvement over time.
- As a learner, I want to **mark saved questions as reviewed** so I can track what I’ve already studied.

### Design mockups

Add mockups (hand-drawn or Figma screenshots) to `docs/mockups/` and link them here.

- `docs/mockups/question-browser.png`
- `docs/mockups/quiz.png`
- `docs/mockups/saved.png`

Wireframe description:

- **Navbar**: Saved / Mistakes / Favorites / History / Add / Quiz / Browse
- **Question Browser**: Search + Topic dropdown + Difficulty dropdown + Apply/Clear + results list + pagination
- **Quiz**: Question card + answer choices + correctness feedback + Favorite/Mistake actions

---

## Rubric alignment notes (be honest)

- **Uses Node + Express**: Yes (`server/server.js`)
- **Uses MongoDB**: Yes (native driver; see `server/config/db.js`)
- **At least 2 Mongo collections + CRUD**: Yes (multiple collections; full CRUD on `savedQuestions`)
- **1000 synthetic records**: Yes (`server/seedQuestions.js`)
- **ESLint config & no errors**: Frontend uses `client/eslint.config.js` and should pass `npm run lint`
- **React components with hooks**: Yes (multiple pages/components use hooks)
- **MIT license**: Included as `LICENSE` (update copyright name)

Important (rubric-specific):

- This project currently uses **`cors`** on the backend (`server/package.json`).  
  If your class rubric prohibits CORS, remove it and adjust deployment/proxy strategy accordingly.
- Authentication with **Passport** is **not implemented** in this codebase. If your rubric requires it, it must be added.

---

## Video demo

Add your narrated demo video link here:

- _YouTube / Google Drive link_

---

## License

MIT License. See `LICENSE`.

