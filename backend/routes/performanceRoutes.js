const express = require("express");
const { getUserPerformance, updateUserPerformance } = require("../controllers/performanceController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's performance
router.get("/", protect, getUserPerformance);

// Update user performance after an exam
router.put("/update", protect, async (req, res) => {
    try {
        const { score } = req.body;
        if (!score) {
            return res.status(400).json({ message: "Score is required" });
        }

        await updateUserPerformance(req.user.id, score);
        res.status(200).json({ message: "Performance updated successfully" });

    } catch (error) {
        console.error("Error updating performance:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
