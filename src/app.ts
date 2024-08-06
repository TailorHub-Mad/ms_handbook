import 'dotenv/config';
import './loaders/log.loader';
import * as http from 'http';
import express from 'express';
import { PORT } from '@constants/env.constants';
import cors from 'cors';
import helmet from 'helmet';
import * as loaders from './loaders';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { errorHandler } from './middleware/error.middleware';
import { MongoConnection } from './loaders/db.loader';
import { WebSocketServer } from 'ws';
import { openaiValidation } from '@validations/openaiValidation.validation';
import { createConversation } from './services/openai.service';

export const app = express();

app.use(
	cors({
		origin: true,
		credentials: true
	})
);

app.use(helmet());

app.use((_req, res, next) => {
	res.setHeader('Permissions-Policy', 'geolocation=(), interest-cohort=()');
	next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());
app.use(loaders.morganMiddleware);

const processId = process.pid;
app.get('/', async (_req, res) => {
	res.json({ status: `Process handled by pid: ${processId}` });
});
loaders.middlewares(app);
loaders.router(app);
app.use(errorHandler);

new Promise((resolve) => resolve(MongoConnection.open()))
	.then(() => {
		const server = http.createServer(app);

		const wss = new WebSocketServer({ server });

		wss.on('connection', (ws) => {
			logger.info('** SOCKET CONNECTED **');
			ws.on('message', async (message) => {
				const data = JSON.parse(message.toString());
				if (data.type === 'createConversation') {
					await openaiValidation.validateAsync({ message: data.message });
					await createConversation(data.message, ws);
				}
			});
		});

		return server;
	})
	.then((server) => {
		server.listen(PORT, () => {
			logger.info(`listening on port ${PORT}!`);
		});
		server.on('error', loaders.onError);
	})
	.catch((err) => logger.error(`Error: ${err}`));
