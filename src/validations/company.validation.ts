import Joi from 'joi';

export const findTokenValidation = Joi.object({
	start_date: Joi.date().required(),
	end_date: Joi.date().required()
});

export const queryRecordsValidation = Joi.object({
	month: Joi.number().min(1).max(12).required(),
	limit: Joi.number().min(1).max(100).required(),
	page: Joi.number().min(0).required()
});
