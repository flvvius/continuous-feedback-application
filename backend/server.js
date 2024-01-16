import express from 'express'
import env from 'dotenv'
import cookieSession from 'cookie-session';
import passport from 'passport';
import db from './dbConfig.js';
import dbInit from './entities/dbInit.js';
import activityRouter from './routes/Activity.js';
import feedbackRouter from './routes/Feedback.js';
import userRouter from './routes/User.js';
import userActivityRouter from './routes/Users_activities.js';
import authRouter from './routes/auth.js';
import './auth.js'
import cors from "cors"

env.config();

process.env.TZ = 'Europe/Bucharest';

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
        credentials: true,
        enablePreflight: true
    })
);


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieSession({
    name: "session",
    keys: ["ceva"],
    maxAge: 24 * 60 * 60 * 1000, // primul parametru = nr de ore
}));

app.use(passport.authenticate("session"));

dbInit();

console.log('ceva');

// app.use(cors( {
//     origin: "http://localhost:1235",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// })
// )

app.get("/reset", async (req, res) => {
    try {
        await db.sync({force: true});
        res.status(200).send("DB reseted succesfully!");
    } catch(err) {
        console.log(err);
        res.status(500).send("Failed resetting the database!");
    }
})

app.use("/api", activityRouter);
app.use("/api", feedbackRouter);
app.use("/api", userRouter);
app.use("/api", userActivityRouter);
app.use("/api", authRouter);

app.use("/", (req, res) => {
    res.status(200).send("Server ON!");
});

app.listen(port, () => {
    console.log(`The app is running on: http://localhost:${port}`);
});