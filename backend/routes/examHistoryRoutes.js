const express = require("express");
const { getUserExamHistory, recordExamAttempt } = require("../controllers/examHistoryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserExamHistory);
router.post("/record", protect, recordExamAttempt);

module.exports = router;
