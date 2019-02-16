import * as Utils from '@modules/utils';
import * as Dotenv from 'dotenv';

Dotenv.load();

export const PasswordSalt = Utils.tryReadEnv('PASSWORD_SALT');