import * as I from '@modules/interfaces';
import { InputType, Field, Float } from "type-graphql";
import { nullable } from '@modules/flags';


const MaybeFloatType      = Field(_type => Float,   {nullable});
const MaybeFloatArrayType = Field(_type => [Float], {nullable});

@InputType()
export class FilterFloatInputType {
    @MaybeFloatType      eq?:  I.Maybe<number>;
    @MaybeFloatType      geq?: I.Maybe<number>;
    @MaybeFloatType      leq?: I.Maybe<number>;
    @MaybeFloatType      neq?: I.Maybe<number>;
    @MaybeFloatType      gt?:  I.Maybe<number>;
    @MaybeFloatType      lt?:  I.Maybe<number>;
    @MaybeFloatArrayType in?:  I.Maybe<number[]>;
    @MaybeFloatArrayType nin?: I.Maybe<number[]>;
}