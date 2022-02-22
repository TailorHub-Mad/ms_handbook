import { Request, Response, NextFunction } from 'express';
import { cleanBearerToken } from '../utils/string.util';
import { validateToken } from '../services/firebase.service';

export const tokenValidation = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	const { authorization } = req.headers;

	try {
		if (!authorization) return next(); // throw new BaseError('No authorization', 401);
		const { uid, role, email, _id } = await validateToken(cleanBearerToken(authorization));
		req.user = { id_firebase: uid, role, _id, email };
		next();
	} catch (err) {
		next(err);
	}
};
