import * as I from '@modules/interfaces';
import { InputType, Field } from "type-graphql";
import { nullable } from "@modules/flags";


const MaybeStringType      = Field(_type => String,   {nullable});
const MaybeStringArrayType = Field(_type => [String], {nullable});

@InputType()
export class FilterStringInputType {
    @MaybeStringType      regexp?:  I.Maybe<string>;
    @MaybeStringArrayType in?:      I.Maybe<string[]>;
    @MaybeStringArrayType nin?:     I.Maybe<string[]>;
}