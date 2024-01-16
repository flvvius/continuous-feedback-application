import User from "../entities/User.js";

const createUser = async (user) => {
    try {
        return await User.create(user); // , {include: [{model: Feedback, as: "Feedback"}]}
    } catch(err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return "Email-ul a fost deja folosit!";
        } else if (err.name === "SequelizeValidationError") {
            return "Eroare introducere date!"
        } else {
            return err.name;
        }
    }
   
}

const getUser = async () => {
    return await User.findAll();
}

export {
    createUser,
    getUser
}