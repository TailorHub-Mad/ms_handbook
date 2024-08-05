import winston from 'winston';

// Definimos que niveles tendrá nuestros loggs
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4
};

// Dependiendo de si estamos en producción o en dev mostraremos unos logs u otros.
const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

// Determinamos los colores que tendran los logs.
const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white'
};

winston.addColors(colors);

// Confiigiramos el formato que tendrán nuestros logs
const format = winston.format.combine(
	winston.format.timestamp({ alias: 'Base_Back', format: 'DD-MM-YYYY HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
	level: level(),
	levels,
	format
});

// Lo añadimos en global para poder utilizarlo en toda la aplicación sin tener que importarlo.
(global as { logger?: winston.Logger }).logger = logger;
