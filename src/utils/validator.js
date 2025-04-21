const Joi = require('joi');

const validateUser = (data, type = 'register') => {
    const base = {
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
    };

    let schema;

    if (type === 'register') {
        schema = Joi.object({
            ...base,
            name: Joi.string().min(3).required(),
        });
    } else if (type === 'login') {
        schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
    } else if (type === 'editProfile') {
        schema = Joi.object({
            name: Joi.string().min(3).optional(),
            email: base.email,
            password: base.password,
        });
    } else {
        schema = Joi.object();
    }

    return schema.validate(data);
};

module.exports = validateUser;
