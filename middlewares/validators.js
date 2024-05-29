const { validationResult } = require('express-validator');
const { createError } = require("../utils/error.js");
exports.validate = (schemas) => {
    return async (req, res, next) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        return next(createError(400, {
            errors: errors,
        }))
    };
}






