import Activity from "./Activity.js";
import Feedback from "./Feedback.js";
import User from "./User.js";

const FK_config = () => {
    Activity.hasMany(Feedback, {as: "Feedback", foreignKey: "activityId"});
    Feedback.belongsTo(Activity, {foreignKey: "activityId"});

    User.belongsToMany(Activity, {through: "Users_activities", as: "Activities", foreignKey: "userId"});
    Activity.belongsToMany(User, {through: "Users_activities", as: "Users", foreignKey: "activityId"});
}

const dbInit = () => {
    FK_config();
}

export default dbInit;