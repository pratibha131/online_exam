const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan"); //  Logs requests
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRoutes = require("./routes/questionRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const examHistoryRoutes = require("./routes/examHistoryRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const examAnalyticsRoutes = require("./routes/examAnalyticsRoutes");

dotenv.config(); 


(async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
})();

const app = express();

// Middlewares
app.use(express.json()); //  Parses incoming JSON requests
app.use(cors()); //  Enable CORS for all routes
app.use(morgan("dev")); //  Logs HTTP requests to the console


app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/exam-history", examHistoryRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/exam-analytics", examAnalyticsRoutes);


app.get("/", (req, res) => {
    res.send("🎯 Online Exam Platform API is running...");
});

//Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
