import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/error.js";
import userRouter from "./routes/user.js"
export const app = Express();

app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use("/api/v1/user", userRouter);
app.use(ErrorMiddleware);
