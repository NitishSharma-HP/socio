import winston from 'winston';
const {combine, timestamp, printf} = winston.format;

//custom log format
const format = printf(({level, message, timestamp})=>{
    return `${timestamp} ${level}: ${message}`;
})

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        format
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),  // Log to console with colorization
        new winston.transports.File({ filename: 'app.log' })  // Log to file
    ]
})

export default logger;