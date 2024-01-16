import Users_activities from "../entities/Users_activities.js";

const createUserActivity = async (user_activity) => {
    return await Users_activities.create(user_activity); // , {include: [{model: Feedback, as: "Feedback"}]}
}

const getUserActivity = async () => {
    return await Users_activities.findAll();
}

export {
    createUserActivity,
    getUserActivity
}