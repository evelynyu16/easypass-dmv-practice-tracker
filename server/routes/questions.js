const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

function normalizeString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(String(value), 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

router.get("/random", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("questions");

    const randomQuestion = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

    if (!randomQuestion.length) {
      return res.status(404).json({ message: "No questions found." });
    }

    res.json(randomQuestion[0]);
  } catch (error) {
    console.error("Error fetching random question:", error);
    res.status(500).json({ message: "Failed to fetch random question." });
  }
});

// GET question metadata for filters (topics, difficulties)
router.get("/meta", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("questions");

    const [topics, difficulties] = await Promise.all([
      collection.distinct("topic", { topic: { $type: "string" } }),
      collection.distinct("difficulty", { difficulty: { $type: "string" } }),
    ]);

    res.json({
      topics: topics.filter(Boolean).sort(),
      difficulties: difficulties.filter(Boolean).sort(),
    });
  } catch (error) {
    console.error("Error fetching question meta:", error);
    res.status(500).json({ message: "Failed to fetch question meta." });
  }
});

// GET questions list with filters + pagination
// Query params:
// - topic: exact match
// - difficulty: exact match
// - q: text search (regex on questionText)
// - page: 1-based
// - limit: page size
router.get("/", async (req, res) => {
  try {
    const topic = normalizeString(req.query.topic);
    const difficulty = normalizeString(req.query.difficulty);
    const q = normalizeString(req.query.q);
    const page = parsePositiveInt(req.query.page, 1);
    const limit = Math.min(parsePositiveInt(req.query.limit, 20), 100);

    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (q) filter.questionText = { $regex: q, $options: "i" };

    const db = await connectDB();
    const collection = db.collection("questions");

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      collection
        .find(filter)
        .sort({ questionId: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});

module.exports = router;