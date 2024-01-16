import express from 'express';
import { createFeedback, getFeedback, getFeedbackWithFilterAndPagination } from '../dataAccess/Feedback.js';

let feedbackRouter = express.Router();

feedbackRouter.route("/feedback").post(async (req, res) => {
    return res.json(await createFeedback(req.body));
});

feedbackRouter.route('/feedback').get( async (req, res) => {
    return res.json(await getFeedback());
});

feedbackRouter.route('/feedbackFilter').get(async (req, res) => {
    return res.json(await getFeedbackWithFilterAndPagination(req.query));
});

export default feedbackRouter;