import * as Config from '@app/config';
import * as Crypto from 'crypto';
import * as Utils  from '@modules/utils';
import * as I      from '@modules/interfaces';
import { required, index               } from '@modules/flags';
import { TryCrud                       } from '@modules/mongoose-utils/try-crud';
import { ObjectType, Field             } from 'type-graphql';
import { Typegoose, prop, staticMethod } from 'typegoose';


@ObjectType('User') 
export class UserType extends Typegoose {

    @Field()
    @prop()
    get id(this: User): I.ObjectId {
        return this._id;
    }

    @prop({ required }) 
    password!: string; // do not expose password as public GraphQL field

    @Field()
    @prop({ required, index }) 
    login!: string;

    @Field()
    @prop({ required, default: Date.now })
    init_date!: Date;

    /**
     * Tries to find User with the given `login` and `password`. Password is 
     * automatically encoded before being propagated to the mongoose.
     * 
     * @param login    Target user login.
     * @param password Raw target user password.
     * 
     * @throws NotFoundError | Error
     * If no such user was found or mongoose ODM throws an error.
     */
    @staticMethod
    static async tryFindByLoginPassword(this: UserModel, login: string, password: string) {
        return UserTryCrud.tryFindOne({
            login, 
            password: this.encodePassword(password)
        });
    }


    /**
     * Returns a hash-encoded representation of password to store in the database.
     * @param password Real password to be encoded.
     */
    @staticMethod
    public static encodePassword(this: UserModel, password: string) {
        const hash = Crypto.createHmac('sha512', Config.PasswordSalt);
        hash.update(password);
        return hash.digest('hex');
    }

}

// Narrowing type, due to Typegoose typing bug (instance props on model)
export const User = Utils.getModelFromTypegoose(UserType);
export const UserTryCrud = new TryCrud(User);

export type User      = InstanceType<UserModel>;
export type UserModel = typeof User;
export type UserData  = I.TypegooseDocProps<UserType>;


