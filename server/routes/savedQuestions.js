const express = require("express");
const router = express.Router();

const {
  addSavedQuestion,
  getSavedQuestions,
  editSavedQuestion,
  removeSavedQuestion,
} = require("../controllers/savedQuestionsController");

// CREATE
router.post("/", addSavedQuestion);

// READ
router.get("/", getSavedQuestions);

// UPDATE
router.put("/:id", editSavedQuestion);

// DELETE
router.delete("/:id", removeSavedQuestion);

module.exports = router;