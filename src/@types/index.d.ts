import { IReqUser } from '../interfaces/models.interface';
import winston from 'winston';

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_NAME: string;
			IV_LENGTH: string;
			KEY: string;
		}
	}

	namespace Express {
		interface Request {
			// Falta por definir que guardar en el req.user
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			user: IReqUser;
		}
		namespace Multer {
			interface File {
				location: string;
				metada: {
					fieldName: string;
				};
				fieldname: string;
				originalname: string;
				mimetype: string;
				size: number;
				bucket: string;
			}
		}
	}
	const logger: winston.Logger;
}

export declare const logger: winston.Logger;
