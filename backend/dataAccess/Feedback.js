import Feedback from "../entities/Feedback.js";
import LikeOp from "./Operators.js";

const createFeedback = async (feedback) => {
    return await Feedback.create(feedback); // , {include: [{model: Feedback, as: "Feedback"}]}
}

const getFeedback = async () => {
    return await Feedback.findAll();
}

const getFeedbackWithFilterAndPagination = async (filter) => {

    // console.log(filter);

    if (!filter.take)
      filter.take = 10;

    if (!filter.skip)
      filter.skip = 1;

    let whereClause = {};
    if (filter.type)
        whereClause.type = {[LikeOp]: `%${filter.type}%`};
  
    if (filter.date) {
        const date = new Date(filter.date);
        // console.log(date);
        whereClause.date = date; //{[LikeOp]: `%${filter.date}%`}
    }
  
    return await Feedback.findAndCountAll (
      {   
        distinct: false,         
        where: whereClause,
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take), // skip este pagina curenta iar take sunt cate inregistrari vin pe pagina
      });

}

export {
    createFeedback,
    getFeedback,
    getFeedbackWithFilterAndPagination
}