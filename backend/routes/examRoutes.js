const express = require("express");
const {
    createExam,
    getExams,
    getExamById, 
    updateExam,
    deleteExam,
    sendExamReminders
} = require("../controllers/examController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/create", protect, authorize("admin", "examiner"), createExam);
router.get("/", protect, getExams);
router.get("/:examId", protect, getExamById);
router.put("/:examId", protect, authorize("admin", "examiner"), updateExam);
router.delete("/:examId", protect, authorize("admin"), deleteExam);
router.post("/:examId/reminders", protect, authorize("admin"), sendExamReminders);

module.exports = router;
