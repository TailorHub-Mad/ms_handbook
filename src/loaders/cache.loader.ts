import NodeCache from 'node-cache';

type Key = string | number;

class CacheLocal {
	// eslint-disable-next-line no-use-before-define
	private static _instance: CacheLocal;

	private cache: NodeCache;

	private constructor(ttlSeconds: number) {
		this.cache = new NodeCache({
			stdTTL: ttlSeconds,
			checkperiod: ttlSeconds * 0.2,
			useClones: false
		});
	}

	// inicializamos la clase si no existe ya una instancia, si existe la devolvemos
	public static getInstance(): CacheLocal {
		if (!CacheLocal._instance) {
			CacheLocal._instance = new CacheLocal(60); // tiempo de vida del cache en segundos.
		}
		return CacheLocal._instance;
	}

	public get<T>(key: Key): T | undefined {
		return this.cache.get<T>(key);
	}

	public set<T>(key: Key, value: T): void {
		this.cache.set(key, value);
	}
}

export default CacheLocal.getInstance();
