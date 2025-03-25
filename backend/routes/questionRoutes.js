const express = require("express");
const {
    addQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion
} = require("../controllers/questionController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new question to an exam (only accessible by admin)
router.post("/:examId", protect, authorize("admin"), addQuestion);

// Get all questions for a specific exam
router.get("/:examId", protect, getQuestions);

// Update a specific question (only accessible by admin)
router.put("/:examId/:questionId", protect, authorize("admin"), updateQuestion);

// Delete a specific question (only accessible by admin)
router.delete("/:examId/:questionId", protect, authorize("admin"), deleteQuestion);

module.exports = router;
