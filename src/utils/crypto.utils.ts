import 'dotenv';
import { IV_LENGTH, KEY, ALGORITHM } from '@constants/env.constants';
import crypto from 'crypto';

export const encrypt = (string: string): string => {
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
	const encrypted = Buffer.concat([cipher.update(string, 'utf8'), cipher.final()]);

	return Buffer.concat([iv, encrypted]).toString('base64');
};

export const decrypt = (enc: string): string => {
	const data = Buffer.from(enc, 'base64');
	const iv = data.subarray(0, IV_LENGTH);
	const text = data.subarray(IV_LENGTH);
	const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
	let str = decipher.update(text, undefined, 'utf8');
	str += decipher.final('utf8');
	return str;
};
