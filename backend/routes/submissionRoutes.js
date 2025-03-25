const express = require("express");
const { getPendingSubmissions, gradeSubmission } = require("../controllers/submissionController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/pending", protect, authorize("examiner"), getPendingSubmissions);
router.post("/grade", protect, authorize("examiner"), gradeSubmission);

module.exports = router;
