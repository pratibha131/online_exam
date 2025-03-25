const express = require("express");
const { getExamAnalytics } = require("../utils/examAnalytics");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get analytics for a specific exam
router.get("/:examId", protect, async (req, res) => {
    try {
        const analytics = await getExamAnalytics(req.params.examId);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
