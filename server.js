require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");
const eventRouter = require("./routers/eventRouter");
const requestRouter = require("./routers/requestRouter");
const dashboardRouter = require("./routers/dashboardRouter");
const { cloudinaryConfig } = require("./utils/Upload");

const app = express();
app.use(express.json());
connectDB();
cloudinaryConfig();

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/request", requestRouter);
app.use("/api/dashboard", dashboardRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
