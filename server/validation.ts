import Joi from 'joi';

export const validateUser = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(6).max(50).required()
    });
    return schema.validate(data);
}

export const validateEvent = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(2000).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        user: Joi.string().min(3).max(500).required(),
    });
    return schema.validate(data);
}