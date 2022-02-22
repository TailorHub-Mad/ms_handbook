import * as allMiddlewares from '../middleware';
import { Application } from 'express';

/**
 *
 * @param app
 *
 * Recorremos todos los middleware que exporte el archivo ../middleware/index.ts y lo ejecutamos.
 */
export const middlewares = (app: Application): void => {
	Object.values(allMiddlewares).forEach((middleware) => app.use(middleware));
};
