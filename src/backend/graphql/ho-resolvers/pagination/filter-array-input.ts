import * as I   from '@modules/interfaces';
import { InputType, Field } from "type-graphql";
import { nullable } from "@modules/flags";
import { FilterInputType } from '@graphql/ho-resolvers/pagination';



export function makeFilterArrayInputType<TFilterItemInputType extends FilterInputType>(
    filterItemInputType: TFilterItemInputType
) {
    @InputType()
    abstract class __FilterArrayInputType {
        @Field(_type => [filterItemInputType], {nullable}) 
        every?: I.Maybe<TFilterItemInputType>;
        @Field(_type => [filterItemInputType], {nullable}) 
        some?:  I.Maybe<TFilterItemInputType>;
    }
    return __FilterArrayInputType;
}

export interface FilterArrayInputType<TItem> {
    every?: I.Maybe<FilterInputType<TItem>>;
    some?:  I.Maybe<FilterInputType<TItem>>;
}