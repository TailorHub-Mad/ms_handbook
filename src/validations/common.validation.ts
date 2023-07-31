import { BaseError } from '@errors/base.error';
import Joi from 'joi';
import { isValidObjectId, Types } from 'mongoose';

export const idFirebaseValidation = Joi.string().alphanum().max(40);

export const mongoIdValidation = Joi.any().external((value) => {
	if (value)
		if (isValidObjectId(value) && String(new Types.ObjectId(value)) === value.toString()) {
			return value;
		} else {
			throw new BaseError('value "invalid" at path "_id"', 400);
		}
});
