const express = require("express");
const { issueCertificate, getUserCertificates } = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST route to issue a certificate, requires authentication
router.post("/issue", protect, issueCertificate);

// GET route to retrieve certificates for a specific user
router.get("/:userId", protect, getUserCertificates);

module.exports = router;
