const activeExams = new Map(); // Store active exam sessions

// Function to start tracking an exam session
exports.startExamSession = (userId, examId) => {
    const session = {
        userId,
        examId,
        startTime: Date.now(),
        lastActivity: Date.now(),
        violations: 0, // Track suspicious activity
    };
    activeExams.set(userId, session);
};

// Function to update last activity timestamp (for inactivity tracking)
exports.updateActivity = (userId) => {
    if (activeExams.has(userId)) {
        activeExams.get(userId).lastActivity = Date.now();
    }
};

// Function to check for suspicious activity (tab switching, inactivity)
exports.detectSuspiciousActivity = (userId) => {
    const session = activeExams.get(userId);
    if (!session) return false;

    const now = Date.now();
    const inactivityLimit = 300000; // 5 minutes

    // Check if user has been inactive too long
    if (now - session.lastActivity > inactivityLimit) {
        session.violations += 1;
    }

    return session.violations > 2; // Allow up to 2 violations before flagging
};

// Function to end an exam session
exports.endExamSession = (userId) => {
    activeExams.delete(userId);
};
