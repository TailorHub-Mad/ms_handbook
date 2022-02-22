import { firebase } from '../loaders/firebase.loader';
import { auth } from 'firebase-admin';
import { BaseError } from '@errors/base.error';

export const setCustomClains = async (_id: string, uid: string, role: string): Promise<void> => {
	return await firebase.auth().setCustomUserClaims(uid, { _id, role });
};

export const updateUser = async (
	uid: string,
	update: auth.UpdateRequest
): Promise<auth.UserRecord> => {
	return await firebase.auth().updateUser(uid, update);
};

export const createUser = async (
	{ _id, email, password }: { _id: string; email: string; password: string },
	role: string
): Promise<string> => {
	const user = await firebase.auth().createUser({ email, password });
	if (!user) throw new BaseError('Error create user', 422);
	await setCustomClains(_id, user.uid, role);
	return user.uid;
};

export const validateToken = async (token: string): Promise<auth.DecodedIdToken> => {
	return await firebase.auth().verifyIdToken(token);
};

export const deleteUserFirebase = (id_firebase: string): Promise<void> =>
	firebase.auth().deleteUser(id_firebase);

export const verifyEmailUserFirebase = async (email: string): Promise<boolean> => {
	const user = await firebase
		.auth()
		.getUserByEmail(email)
		.catch(() => null);
	return !!user;
};
