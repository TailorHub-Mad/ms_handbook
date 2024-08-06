// openai.service.ts
import { openai } from '@config/openai.config';
import { ASSISTANT_ID } from '@constants/env.constants';
import WebSocket from 'ws';

export const createConversation = async (message: string, ws: WebSocket) => {
	const thread = await openai.beta.threads.create();

	await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: message
	});

	if (!ASSISTANT_ID) {
		throw new Error('ASSISTANT_ID not found');
	}

	openai.beta.threads.runs
		.stream(thread.id, {
			assistant_id: ASSISTANT_ID
		})
		.on('textCreated', (text) => ws.send(JSON.stringify({ type: 'textCreated', text })))
		.on('textDelta', (textDelta) => {
			ws.send(JSON.stringify({ type: 'textDelta', text: textDelta.value }));
		})
		.on('textDone', () => {
			ws.send(JSON.stringify({ type: 'textDone' }));
		});
};
