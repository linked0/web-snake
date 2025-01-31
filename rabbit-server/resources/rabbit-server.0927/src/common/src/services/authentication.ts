import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Authentication {
    async pwdToHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`;
    }

    async pwdCompare(storedPassword: string, suppliedPassword: string) {
        const [hassedPasswrod, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        return buf.toString('hex') === hassedPasswrod;
    }
}

export const authenticationService = new Authentication()
