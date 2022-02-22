import morgan, { StreamOptions } from 'morgan';
import { Request, Response } from 'express';

// Cuando escriba utilizará http de winston.
const stream: StreamOptions = {
	write: (message) => logger.http(message)
};

// Solo se ejecutará cuando este en dev y el estado sea menor que 400.
const skip = (_req: Request, res: Response) => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development' && res.statusCode < 400;
};

// Estrucutra que seguirá para mostrarnos la llamadas.
export const morganMiddleware = morgan(
	':method :url :status :res[content-length] - :response-time ms',
	{
		stream,
		skip
	}
);
