import * as Utils  from '@modules/utils';
import * as Dotenv from 'dotenv';
import * as Path   from 'path';

Dotenv.load();

export const PasswordSalt = Utils.tryReadEnv('PASSWORD_SALT');
export const Port         = Utils.tryReadEnv('PORT');
export const DatabaseUrl  = Utils.tryReadEnv('DATABASE_URL');

export const Frontend = {
    DistDir:       pathFromRoot('dist'),
    AssetsDir:     pathFromRoot('assets'),
    IndexHtmlPath: pathFromRoot('dist/index.html')
};

function pathFromRoot(relativePath: string) {
    return Path.normalize(Path.join(__dirname, '../../', relativePath));
}