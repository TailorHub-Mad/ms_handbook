import Joi from 'joi';

export const openaiValidation = Joi.object({
	message: Joi.string().required()
});
