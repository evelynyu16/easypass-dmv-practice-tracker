# EasyPass DMV Practice Tracker — Design Document

> - Project description
> - User Personas
> - User stories (use cases but with a story)
> - Design mockups

---

## Project description

**EasyPass DMV Practice Tracker** is a web application that helps DMV learners practice and review:

- The **frontend** uses React (hooks) for client-side rendering.
- The **backend** uses Node.js + Express to provide an API.
- The **database** uses MongoDB (native driver) to store the question bank, saved lists, and attempt history.

The core problem it solves: learners often don’t know what to practice next, how to review mistakes efficiently, or how to measure improvement. EasyPass connects the learning loop—**browse/filter → practice → save → review → track history**—so users can:

- Focus on weak areas by **Topic** and **Difficulty**
- Practice with random questions to simulate an exam
- Save questions into **Favorites** or a **Mistake Notebook** for targeted review
- Use **Attempt History** to see recent correct/incorrect outcomes

### Scope (current version)

**Included pages / features**

- **Browse (Question Browser)**: browse the bank with Topic/Difficulty/Search filters and pagination
- **Quiz (Practice Quiz)**: random questions with immediate correctness feedback
- **Saved / Favorites / Mistakes**: review saved questions, delete, and mark as reviewed
- **History**: view past attempts
- **Add**: manually add a saved question (for personal notes/organization)

**Out of scope (not included in this version)**

- User registration/login (this project primarily uses a demo user flow)
- Advanced analytics dashboards (e.g., long-term trends by topic)
- Collaboration / shared study lists

---

## User Personas

### Persona 1 — Busy commuter Alex (24)

- **Background**: Studies in short bursts during commute/breaks and wants to “practice what matters most.”
- **Goals**
  - Complete a high-quality practice session in 10–15 minutes
  - Target weak areas precisely by topic/difficulty
- **Pain points**
  - Fully random practice feels too scattered to improve weak areas quickly
  - Mistakes are hard to collect and review systematically
- **Scenario**
  - During lunch break, filters `Traffic Signals + hard` to do focused practice and review


### Persona 2 — First-time driver Mei (17)

- **Background**: Preparing for a first license; needs a sustainable, repeatable review process.
- **Goals**
  - Build a “mistake notebook” and review common errors until they’re consistently correct
  - See progress over time to stay motivated
- **Pain points**
  - Missed questions end up scattered and hard to revisit
  - Unclear whether practice is actually improving results
- **Scenario**
  - Does ~20 questions after dinner; saves missed ones to Mistakes; reviews the Mistake Notebook on weekends

### Persona 3 — Test retaker Jordan (31)

- **Background**: Failed once; wants a focused plan to improve and validate progress.
- **Goals**
  - Quickly identify frequently missed topics
  - Use history to confirm accuracy is improving
- **Pain points**
  - Without a feedback loop, practice feels directionless
  - Repeats already-mastered content and wastes time
- **Scenario**
  - Reviews recent mistakes in History → filters a related topic in Browse → returns to Quiz to re-test

---

## User stories

### Story 1 — Goal-driven filtered practice (Browse)

**Alex**, I want to spend 10 minutes before work practicing only **Traffic Signals / hard** questions, instead of aimlessly scrolling random questions.  
**When I open the Browse page**, I can select a Topic and Difficulty, optionally type keywords, then click **Apply** to see only matching questions. I can use **Prev/Next** to keep practicing the same type. If my filters are too narrow, I can click **Clear filters** and start over.

### Story 2 — Random quiz with immediate feedback (Quiz)

**Mei**, I want exam-like random practice and instant correctness feedback so I can build confidence and correct misunderstandings quickly.  
**When I enter the Quiz page**, the app loads a random question. After I click an option, it immediately shows whether I’m correct and displays the correct answer if I’m wrong. I click **Next Question** to continue. If I want to reset my counters, I click **Restart Quiz**.

### Story 3 — Mistake notebook for review (Mistakes)

**Mei**, I want to collect questions I missed (or felt unsure about) so I can review them later until I consistently get them right.  
**When I hit a hard question in Quiz**, I click **❌ Mistake** to save it to the Mistake Notebook. Later, I open the **Mistakes** page, review the cards, click **Mark Reviewed** when I’m done, or **Delete** if I no longer need it.

### Story 4 — Favorites for must-review questions (Favorites)

**Jordan**, I want to collect high-frequency or easy-to-confuse questions into a “must-review before the test” list.  
**When I see an important question in Quiz**, I click **⭐ Favorite**. Later I open the **Favorites** page to review them, and I can **Mark Reviewed** or **Delete** items as needed.

### Story 5 — Closing the loop with history (History)

**Jordan**, I want attempt history to confirm whether I’m improving and to identify topics I keep missing.  
**When I open the History page**, I can see recent attempts (newest first), including question details, my selected answer, whether it was correct, and the topic/difficulty. Based on mistakes, I focus on a topic and return to **Browse** or **Quiz** for targeted practice.

---

## Design mockups (wireframes / mockup plan)

> You can place real mockups (Figma screenshots or photos of hand-drawn wireframes) in `docs/mockups/`, then replace the links below.
>
> Suggested filenames:
> - `docs/mockups/navbar.png`
> - `docs/mockups/question-browser.png`
> - `docs/mockups/quiz.png`
> - `docs/mockups/saved-lists.png`
> - `docs/mockups/history.png`

### Global navigation (Navbar)

**Purpose**: allow users to switch between practice, filtering, review lists, and history at any time.

**Information architecture (buttons)**

- Saved
- Mistakes
- Favorites
- History
- Add
- Quiz
- Browse

**Wireframe (text)**

```
┌─────────────────────────────────────────────────────────────┐
│ EasyPass DMV Practice Tracker                                │
│ [Browse] [Saved] [Mistakes] [Favorites] [History] [Add] [Quiz]│
└─────────────────────────────────────────────────────────────┘
```

---

### Screen 1 — Question Browser (/questions)

**User goal**: filter the question bank by topic/difficulty; quickly find a type of question; paginate through results.

**Key components**

- Filters card
  - Search input
  - Topic select
  - Difficulty select
  - Apply button
  - Clear filters button
- Result summary (Showing X of Y, page)
- Pagination (Prev/Next)
- Question list (question text + metadata + options)

**Wireframe (text)**

```
Title: Question Browser
Active filters label: Topic: ___ • Difficulty: ___ • Search: "___"

[Clear filters]

┌─────────────────────────────────────────────────────────────┐
│ Filters                                                     │
│ Search:  [__________________________]                        │
│ Topic:   [ All topics v ]  Difficulty: [ All v ]   [Apply]  │
└─────────────────────────────────────────────────────────────┘

Showing 20 of 1000 • Page 1 / 50                 [Prev] [Next]

┌─────────────────────────────────────────────────────────────┐
│ ID: Q0001  Topic: Traffic Signals  Difficulty: easy         │
│ Question text ...                                           │
│ Options:                                                    │
│  - ...         - ...                                        │
└─────────────────────────────────────────────────────────────┘
... repeated ...
```

**Loading / error / empty states**

- Loading: shows “Loading…”
- Error: shows “Failed to load questions.”
- Empty: shows “No questions match your filters.”

---

### Screen 2 — Quiz (/quiz)

**User goal**: practice random questions with immediate feedback; save questions to Favorites/Mistakes.

**Key components**

- Progress badges (Correct / Total Answered)
- Metadata (Question ID / Topic / Difficulty)
- Answer options (button list)
- Result feedback (Correct/Incorrect + correct answer)
- Actions
  - ⭐ Favorite
  - ❌ Mistake
  - Next Question
  - Restart Quiz

**Wireframe (text)**

```
Title: Practice Quiz
[Correct: 3] [Total Answered: 5]                     [Restart Quiz]

ID: Q0123
Topic: Safety
Difficulty: medium

⭐ Favorite   ❌ Mistake

Question text...

[Option A]
[Option B]
[Option C]
[Option D]

Feedback: ✅ Correct!  /  ❌ Incorrect. Correct answer: ...

                                        [Next Question]
```

---

### Screen 3 — Saved lists (/ , /favorites , /mistakes)

**User goal**: review saved questions; delete unneeded items; mark items as reviewed.

**Key components**

- Page title (Saved / Favorites / Mistake Notebook)
- SavedQuestionCard list
  - Question ID / Topic / Difficulty / Note / source
  - Mark Reviewed button
  - Delete button

**Wireframe (text)**

```
Title: Saved Questions (or Favorites / Mistakes)

┌─────────────────────────────────────────────────────────────┐
│ Q0456  Topic: Parking  Difficulty: hard   Source: mistake   │
│ Personal note: ...                                          │
│ [Mark Reviewed]                                [Delete]     │
└─────────────────────────────────────────────────────────────┘
... repeated ...
```

---

### Screen 4 — History (/history)

**User goal**: review recent attempts to create a learning feedback loop.

**Key components**

- Attempt list (reverse chronological)
  - questionId / topic / difficulty / isCorrect / answeredAt

**Wireframe (text)**

```
Title: History

┌─────────────────────────────────────────────────────────────┐
│ 2026-03-19  Q0123  Safety  medium   ✅ Correct              │
│ Selected: ...  Correct: ...                                 │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 2026-03-19  Q0789  Traffic Rules  easy   ❌ Incorrect       │
│ Selected: ...  Correct: ...                                 │
└─────────────────────────────────────────────────────────────┘
```

---
