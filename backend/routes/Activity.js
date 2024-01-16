import express from 'express';
import { createActivity, deleteActivity, getActivities, getActivityById, getActivityByAccessCode } from '../dataAccess/Activity.js';

let activityRouter = express.Router();

activityRouter.route("/activity").post(async (req, res) => {

    const response = await createActivity(req.body);
    if (typeof response === 'object')
        return res.status(201).json(response);
    else
        return res.status(400).json(response);
});

activityRouter.route('/activity').get( async (req, res) => {
    return res.json(await getActivities());
});

activityRouter.route('/activity/:id').get( async (req, res) => {
    return res.json(await getActivityById(req.params.id));
});

activityRouter.route('/activity/code/:accessCode').get( async (req, res) => {
    let response = await getActivityByAccessCode(req.params.accessCode)
    if (typeof response === 'object')
        return res.status(201).json(response);
    else
        return res.status(400).json(response);
});

activityRouter.route('/activity/:id').delete(async (req, res) => {
    return res.json(await deleteActivity(req.params.id));
});

export default activityRouter;