const { StatusCodes } = require("http-status-codes");

exports.validateReqBody = (schema) => (req, res, next) => {
    // console.log(req.body);
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        // console.log(validationResult.error, ">>>>>>>>>>>> Error validate body");
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: validationResult.error.details[0].message });
    }
    next();
};
