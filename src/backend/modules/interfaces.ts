import * as Vts      from 'vee-type-safe';
import * as Mongoose from 'mongoose';
import { Typegoose } from 'typegoose';

export type MongooseSchemaObj<TData extends Vts.BasicObject> = {
    [TKey in keyof TData]: MongooseSchemaObj.TypeToSchemaDefinition<TData[TKey]>;
};
export type BufferConstructor = typeof Buffer;
export type ObjectId = Mongoose.Types.ObjectId;


export type TypegooseDocProperties<TClass extends Typegoose> = {
    [TFilteredKey in { 
        [TKey in keyof TClass]: TClass[TKey] extends Function ? never: TKey 
    }[keyof TClass]]: TClass[TFilteredKey]
};




namespace MongooseSchemaObj {

    /**
     * ^- Fixes incorrect mongoose type definition from instance to static type
     * and makes it required.
     */
    type SchemaOpts<TType, TSchemaType> = (
        & Vts.RemoveProperties<Mongoose.SchemaTypeOpts<TType>, 'type'>
        & { type: TSchemaType }
    );
    

    type SchemaTypeToDefinition<TType, TSchemaType> = (
        | TSchemaType 
        | SchemaOpts<TType, TSchemaType>
        
    );

    /* @TODO: add support for Mongoose.Types.Map */
    export type TypeToSchemaDefinition<T> = (
        T extends string  ? SchemaTypeToDefinition<T, StringConstructor>  :
        T extends boolean ? SchemaTypeToDefinition<T, BooleanConstructor> :
        T extends number  ? SchemaTypeToDefinition<T, NumberConstructor>  :
        T extends Date    ? SchemaTypeToDefinition<T, DateConstructor>    :
        T extends Buffer  ? SchemaTypeToDefinition<T, BufferConstructor>  :
        
        T extends Mongoose.Types.ObjectId                           ? 
        SchemaTypeToDefinition<T, Mongoose.Schema.Types.ObjectId>   :

        T extends Mongoose.Types.Decimal128                         ?
        SchemaTypeToDefinition<T, Mongoose.Schema.Types.Decimal128> :
        
        // circular type workaround (not ideal)
        T extends Array<infer TItem> ? 
        SchemaTypeToDefinition<T, ArrayTypeDefinition<TItem>> :

        T extends Vts.BasicObject ? 
        MongooseSchemaObj<T>      :

        never
    );

    interface ArrayTypeDefinition<TItem> extends Array<TypeToSchemaDefinition<TItem>> {}
}