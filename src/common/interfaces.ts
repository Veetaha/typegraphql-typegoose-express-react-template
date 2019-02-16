export { Maybe } from 'vee-type-safe';
export type ClassType<TInstance = any, TArgs extends any[] = any[]> = (
    new (...args: TArgs) => TInstance
);