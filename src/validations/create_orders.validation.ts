import Joi from 'joi';

export const createOrderValidation = Joi.object({
	amount: Joi.number().required(),
	start_date: Joi.date().required(),
	end_date: Joi.date().required()
});
