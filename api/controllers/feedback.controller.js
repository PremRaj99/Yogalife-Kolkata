import Feedback from "../models/feedback.model.js";

export const feedback = async ( req, res, next ) => {
    const { name, email, number, message } = req.body;
    if( number.length !== 10) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid 10 digit mobile number"
        });
    }
    const newFeedback = new Feedback({ name, email, number, message });
    try {
        await newFeedback.save();
        res.status(201).json({
            success: true,
            data: newFeedback,
        });
    } catch (error) {
        return next(error);
    }
}