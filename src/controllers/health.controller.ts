import { Request, Response } from 'express';

export const HealthStatus = (_req: Request, res: Response) => {
	res.status(200).send({
		name: 'MS handbook',
		version: '1.0.0'
	});
};
