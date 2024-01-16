import passport from "passport"
import { Strategy } from "passport-google-oauth20";
import User from "./entities/User.js"

passport.use(new Strategy({
    clientID: "307126505142-jbufoghvsbm44l1r8bo4o7ff1trn9qbp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:1235/api/auth/redirect",
    
}, (accessToken, refreshToken, profile, next) => {
    User.findOne({where: {
        email: profile.emails[0].value,
    },})
    .then((currentUser) => {
        if (!currentUser) {
            User.create({
                name: profile.name.givenName + " " + (profile.name.middleName !== undefined ? profile.name.middleName + " " + profile.name.familyName : profile.name.familyName),
                email: profile.emails[0].value,
                isTeacher: false,
            })
            .then((user) => {
                next(null, user.get());
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
            
        } else {
            // console.log("intra pe else")
            next(null, currentUser.get());
        }
    })
    .catch((err) => {
        next(err);
    })


}))

passport.serializeUser((user, next) => {

    // console.log("serialize")
    next(null, user.id);
  });

passport.deserializeUser(async (id, next) => {
    // console.log("deserialize")
    const currentUser = await User.findOne({ where: { id } });
    // if (currentUser)
        next(null, currentUser);
  });