import { ASSISTANT_ID } from '@constants/env.constants';
import { openai } from '../../config/openai.config';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';

export const createConversation = async (message: string) => {
	const thread = await openai.beta.threads.create();

	await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: message
	});

	if (!ASSISTANT_ID) {
		throw new Error('ASSISTANT_ID not found');
	}

	const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: ASSISTANT_ID
	});

	if (run.status === 'completed') {
		const messages = await openai.beta.threads.messages.list(thread.id);
		const conversation = messages.data;
		const lastMessage = (conversation[0].content[0] as TextContentBlock).text.value;
		return lastMessage;
	}
};
