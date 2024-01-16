import { Op } from "sequelize";
import Activity from "../entities/Activity.js";
import Feedback from "../entities/Feedback.js";

const createActivity = async (activity) => {
    if (activity.description.length > 500) {
        return "Description too long!";
    }
    if (activity.date > activity.expirationDate) { 
        return "Start date must not be greater than expiration date!"
    }
    if (new Date(activity.date).getTime() < new Date().getTime() || new Date(activity.expirationDate).getTime() < new Date().getTime()) {
        return "The dates must be at least equal to the present date!"
    }
    try {
        return await Activity.create(activity); // , {include: [{model: Feedback, as: "Feedback"}]}
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return "The access code already exists!";
        } else if (err.name === "SequelizeDatabaseError") {
            return "You must give an access code!";
        } else {
            return err.name;
        }
    }
}

const getActivities = async () => {
    // console.log((new Date()).toString());
    return await Activity.findAll({include: ["Feedback"]});  // , where: {expirationDate: {[Op.gte]: new Date()}}
}

const getActivityById = async (id) => {
    return await Activity.findByPk(id, {include: ["Feedback"]});
}

const getActivityByAccessCode = async (accessCode) => {
    try {
        return await Activity.findOne({ where: { accessCode } })
    } catch(err) {
        return err.name;
    }
}

const deleteActivity = async (id) => {
    const elem = Activity.findByPk(id, {include: ["Feedback"]});

    if (!elem) {
        console.log("No activity found!");
        return;
    }

    return await elem.destroy();
}

export {
    createActivity,
    getActivities,
    getActivityById,
    deleteActivity,
    getActivityByAccessCode
}