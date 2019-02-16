import { Maybe } from '@common/interfaces';


/**
 * Tries to read variable from `process.env` and returns its value.
 * @param variableId Environmental variable name.
 * @param defaultVal If default value is provided, it will be returned when
 *                   actual env variable is not defined.
 * 
 * @throws Error if `defaultVal == null` and `!(variableId in process.env)`.
 */
export function tryReadEnv(variableId: string, defaultVal?: Maybe<string>) {
    if (variableId in process.env) {
        return process.env[variableId]!;
    }
    if (defaultVal != null) {
        return defaultVal;
    }
    throw new Error(
        `failed to read '${variableId}' environment variable`
    );
}