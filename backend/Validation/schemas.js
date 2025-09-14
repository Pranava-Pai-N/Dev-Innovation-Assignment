import Joi from 'joi';


export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').optional()
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


export const customerCreateSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null),
    company: Joi.string().allow('', null)
});


export const customerUpdateSchema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null),
    company: Joi.string().allow('', null)
}).min(1);


export const leadCreateSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('New', 'Contacted', 'Converted', 'Lost').default('New'),
    value: Joi.number().min(0).default(0)
});


export const leadUpdateSchema = Joi.object({
    title: Joi.string().min(1),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('New', 'Contacted', 'Converted', 'Lost'),
    value: Joi.number().min(0)
}).min(1);