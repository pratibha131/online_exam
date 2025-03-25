const activeExams = new Map(); // Store active exam sessions

const startExamSession = (userId, examId, duration) => {
    const endTime = Date.now() + duration * 60000; // Convert minutes to ms
    activeExams.set(userId, { examId, endTime });
};

const checkExamStatus = (userId) => {
    if (!activeExams.has(userId)) return { active: false };
    
    const { endTime } = activeExams.get(userId);
    if (Date.now() > endTime) {
        activeExams.delete(userId);
        return { active: false };
    }
    return { active: true, remainingTime: endTime - Date.now() };
};

const endExamSession = (userId) => {
    activeExams.delete(userId);
};

module.exports = { startExamSession, checkExamStatus, endExamSession };
