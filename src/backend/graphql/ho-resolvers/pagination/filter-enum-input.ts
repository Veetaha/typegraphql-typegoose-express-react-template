import * as I   from '@modules/interfaces';
import * as Vts from 'vee-type-safe';
import { InputType, Field } from "type-graphql";
import { nullable } from "@modules/flags";



export function makeFilterEnumInputType<TEnum extends Vts.BasicObject>
(enumType: TEnum) {
    type TEnumValue = TEnum[keyof TEnum];

    @InputType()
    abstract class __FilterEnumIntputType {
        @Field(_type => enumType,   {nullable}) eq?:  I.Maybe<TEnumValue>;
        @Field(_type => [enumType], {nullable}) in?:  I.Maybe<TEnumValue[]>;
        @Field(_type => [enumType], {nullable}) nin?: I.Maybe<TEnumValue[]>;
    }
    return __FilterEnumIntputType;
}

export interface FilterEnumIntputType<TEnumValue extends string> {
    eq?:  I.Maybe<TEnumValue>;
    in?:  I.Maybe<TEnumValue[]>;
    nin?: I.Maybe<TEnumValue[]>;
}

