import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor() {
        super('db conenction error')
    }

    generateErrors() {
        return [{ message: 'db connection error' }]
    }
}