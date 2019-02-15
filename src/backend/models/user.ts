export * from '@models/interfaces/user';
import { 
    UserMethods, UserStatics, UserModel, UserDoc, UserData
} from '@models/interfaces/user';

import * as Mongoose  from 'mongoose';
import * as Utils     from '@modules/utils';
import { MongooseSchemaObj } from '@modules/interfaces';


export const SchemaObj: MongooseSchemaObj<UserData> = {
    login:     { type: String, required: true, index: true },
    password:  { type: String, required: true },
    init_date: { type: Date,   required: true, default: Utils.currentDate }
};

export const Schema = new Mongoose.Schema(SchemaObj);

const Statics: UserStatics = {
};

const Methods: UserMethods = {
};

Schema.statics = Statics;
Schema.methods = Methods;

// beware that plugins must come after assigning methods and statics to Schema
// Schema.plugin(CrudPlugin);
// Schema.plugin(Paginate);

export const User = Mongoose.model<UserDoc, UserModel>('User', Schema);
