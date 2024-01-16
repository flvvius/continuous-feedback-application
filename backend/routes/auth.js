import express from "express";
import passport from "passport";

let authRouter = express.Router();

authRouter.get("/auth", passport.authenticate("google", {scope: ["profile", "email"]}));

authRouter.get("/auth/succes", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully logged in",
            user: req.user
        });
    } else {
        res.status(403).json({error: true, message: "Not Authorized"});
    }
})

authRouter.get("/auth/redirect", passport.authenticate("google", {failureRedirect: "/http://localhost:3000/login", successRedirect: "http://localhost:3000/home"}));

authRouter.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/login");
})


export default authRouter;

