import * as I from '@modules/interfaces';
import { Typegoose } from 'typegoose';


/**
 * Tries to read variable from `process.env` and returns its value.
 * @param variableId Environmental variable name.
 * @param defaultVal If default value is provided, it will be returned when
 *                   actual env variable is not defined.
 * 
 * @throws Error if `defaultVal == null` and `!(variableId in process.env)`.
 */
export function tryReadEnv(variableId: string, defaultVal?: I.Maybe<string>) {
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

export function getModelFromTypegoose<T extends I.ClassType<Typegoose>>(constr: T) {
    return new constr().getModelForClass(constr) as I.TypegooseModel<T>;
}