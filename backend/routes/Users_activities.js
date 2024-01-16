import express from 'express';
import { createUserActivity, getUserActivity } from '../dataAccess/Users_activities.js';

let userActivityRouter = express.Router();

userActivityRouter.route("/userActivity").post(async (req, res) => {
    return res.json(await createUserActivity(req.body));
});

userActivityRouter.route('/userActivity').get( async (req, res) => {
    return res.json(await getUserActivity());
});

export default userActivityRouter;