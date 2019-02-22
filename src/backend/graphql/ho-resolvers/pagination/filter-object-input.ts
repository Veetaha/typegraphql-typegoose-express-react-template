import * as I   from '@modules/interfaces';
import * as Vts from 'vee-type-safe';
import { FilterInputType } from '@graphql/ho-resolvers/pagination';



export type FilterObjectInputType<TObjType extends Vts.BasicObject> = {
    [TKey in keyof TObjType]?: I.Maybe<FilterInputType<TObjType[TKey]>>;
};
