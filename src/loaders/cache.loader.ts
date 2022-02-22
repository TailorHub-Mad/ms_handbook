import NodeCache from 'node-cache';

type Key = string | number;

const ttlSeconds = 60; // tiempo de vida del cache en segundos.

export namespace CacheLocal {
	const cache: NodeCache = new NodeCache({
		stdTTL: ttlSeconds,
		checkperiod: ttlSeconds * 0.2,
		useClones: false
	});

	export const get = <T>(key: Key): T | undefined => {
		return cache.get<T>(key);
	};

	export const set = <T>(key: Key, value: T): void => {
		cache.set<T>(key, value);
	};
}
