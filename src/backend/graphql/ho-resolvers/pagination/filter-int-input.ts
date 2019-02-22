import * as I from '@modules/interfaces';
import { InputType, Field, Int } from "type-graphql";
import { nullable } from '@modules/flags';

const MaybeIntType      = Field(_type => Int,   {nullable});
const MaybeIntArrayType = Field(_type => [Int], {nullable});

@InputType()
export class FilterIntInputType {
    @MaybeIntType      eq!:  I.Maybe<number>;
    @MaybeIntType      geq!: I.Maybe<number>;
    @MaybeIntType      leq!: I.Maybe<number>;
    @MaybeIntType      neq!: I.Maybe<number>;
    @MaybeIntType      gt!:  I.Maybe<number>;
    @MaybeIntType      lt!:  I.Maybe<number>;
    @MaybeIntArrayType in!:  I.Maybe<number[]>;
    @MaybeIntArrayType nin!: I.Maybe<number[]>;
}