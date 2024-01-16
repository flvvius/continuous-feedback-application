import express from 'express';
import { createUser, getUser } from '../dataAccess/User.js';

let userRouter = express.Router();

userRouter.route("/user").post(async (req, res) => {
    return res.json(await createUser(req.body));
});

userRouter.route('/user').get( async (req, res) => {
    return res.json(await getUser());
});

export default userRouter;