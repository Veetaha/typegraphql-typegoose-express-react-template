import * as I from '@modules/interfaces';
import { InputType, Field } from "type-graphql";
import { nullable } from "@modules/flags";

@InputType()
export class FilterBooleanInputType {
    @Field(_type => Boolean, {nullable}) eq?: I.Maybe<boolean>;
}