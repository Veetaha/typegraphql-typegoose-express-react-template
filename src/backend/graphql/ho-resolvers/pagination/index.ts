import _ from 'lodash';
import 'mongoose-paginate';
import * as Vts from 'vee-type-safe';
import * as I        from '@modules/interfaces';
import * as Mongoose from 'mongoose';
import { InputType, Query, Resolver, Arg, Field, Int } from 'type-graphql';
import { Min } from 'class-validator';
import { nullable } from '@modules/flags';


import { FilterBooleanInputType } from './filter-boolean-input';
import { FilterFloatInputType   } from './filter-float-input';
import { FilterIntInputType     } from './filter-int-input';
import { FilterStringInputType  } from './filter-string-input';
import { FilterEnumIntputType } from './filter-enum-input';
import { FilterArrayInputType } from './filter-array-input';
import { FilterObjectInputType } from './filter-object-input';
export * from './filter-boolean-input';
export * from './filter-float-input';
export * from './filter-int-input';
export * from './filter-string-input';

export type FilterInputType<TypeScriptType = never> = (
    TypeScriptType extends never ?   
        | FilterBooleanInputType
        | FilterFloatInputType
        | FilterIntInputType
        | FilterStringInputType :
    TypeScriptType extends number  ? FilterIntInputType    | FilterFloatInputType      :
    TypeScriptType extends string  ? FilterStringInputType | FilterEnumIntputType<string> :
    TypeScriptType extends boolean ? FilterBooleanInputType :
    TypeScriptType extends Array<infer TItemType> ? 
    FilterArrayInputType<TItemType>         :
    TypeScriptType extends Vts.BasicObject  ?
    FilterObjectInputType<TypeScriptType>   :
    never
);


@InputType()
export abstract class BasicPaginationInputType {
    @Field(_type => Int) @Min(0) offset!: number;
    @Field(_type => Int) @Min(0) limit!:  number;
}

export interface PaginationInputTypeFactoryOptions<
    TFilterInputType extends I.ClassType, 
    TSortInputType   extends I.ClassType
> {
    filterInputType: TFilterInputType;
    sortInputType:   TSortInputType;
}

export function makePaginationInputType<
    TFilterInputType extends I.ClassType, 
    TSortInputType   extends I.ClassType
>({filterInputType, sortInputType}: PaginationInputTypeFactoryOptions<
    TFilterInputType, TSortInputType
>) {
    @InputType() 
    class PaginationInputType extends BasicPaginationInputType{
        @Field(_type => filterInputType, {nullable}) filter!: TFilterInputType;
        @Field(_type => sortInputType,   {nullable}) sort!:   TSortInputType;
    }
    return PaginationInputType;
}


export function makePaginator<
    TObjTypeClass  extends I.ClassType,
    TMongooseModel extends Mongoose.Model<any>
>({ typename, objectType, mongooseModel }: TGQLPaginatorOptions<TObjTypeClass, TMongooseModel>) {
    @InputType()
    class PaginationFilter {
    }
    // @TODO
    @Resolver()
    class PaginationResolver {
        @Query(returns => [objectType], { name: `getPageOf${typename}` }) 
        async paginatedQuery(
            @Arg('req', _type => PaginationArgs) { offset, limit }: PaginationArgs,
        ): Promise<PaginationResponse<TObjTypeClass>> {
            
        }
    }
    return PaginationResolver;
}