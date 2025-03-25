const Submission = require("../models/Submission");
const Exam = require("../models/Exam");

//Calculate performance metrics for a user based on their exam submissions.

const calculatePerformanceMetrics = async (userId) => {
    try {
        const submissions = await Submission.find({ user: userId });

        if (submissions.length === 0) {
            return { message: "No submissions found", accuracy: 0, avgScore: 0, timeEfficiency: 0, examCount: 0 };
        }

        let totalScore = 0;
        let totalQuestions = 0;
        let totalTimeSpent = 0;
        let totalCorrect = 0;
        
        for (const submission of submissions) {
            const exam = await Exam.findById(submission.exam);
            if (!exam) continue;

            totalScore += submission.score;
            totalTimeSpent += submission.timeTaken;
            totalQuestions += exam.questions.length;
            totalCorrect += submission.correctAnswers;
        }

        const avgScore = totalScore / submissions.length;
        const accuracy = (totalCorrect / totalQuestions) * 100;
        const timeEfficiency = totalTimeSpent / totalQuestions;

        return {
            accuracy: accuracy.toFixed(2),
            avgScore: avgScore.toFixed(2),
            timeEfficiency: timeEfficiency.toFixed(2),
            examCount: submissions.length,
        };

    } catch (error) {
        console.error("Error calculating performance metrics:", error);
        throw new Error("Failed to calculate performance metrics.");
    }
};

module.exports = { calculatePerformanceMetrics };
