export const cleanBearerToken = (authorization: string): string =>
	authorization.substring(7, authorization.length);
