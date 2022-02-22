import * as admin from 'firebase-admin';

const { FIREBASE_CREDENTIALS } = process.env;

const credential = Buffer.from(FIREBASE_CREDENTIALS as string, 'base64').toString();
export const firebase = admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(credential))
});
