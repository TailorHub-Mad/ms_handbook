import { openaiValidation } from '@validations/openaiValidation.validation';
import { Request, Response } from 'express';
import { createConversation } from 'src/services/openai.service';

export const CreateConversation = async (req: Request, res: Response) => {
	try {
		const { message } = req.body;
		console.log('message', message, typeof message);
		await openaiValidation.validateAsync({ message });
		const response = await createConversation(message);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};
