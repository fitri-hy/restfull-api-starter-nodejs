const Joi = require('joi');

const validateUser = (data, type = 'register') => {
    const base = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    };

    const schema =
        type === 'register'
            ? Joi.object({
                ...base,
                name: Joi.string().min(3).required(),
            })
            : Joi.object(base);

    return schema.validate(data);
};

module.exports = validateUser;
