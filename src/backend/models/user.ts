import * as Config from '@app/config';
import * as Crypto from 'crypto';
import { Typegoose, prop, staticMethod, ModelType, } from 'typegoose';
import { required, index } from '@modules/flags';
import { TypegooseDocProperties } from '@modules/interfaces';
import { TryCrud         } from '@modules/mongoose-utils/try-crud';


export class UserTG extends Typegoose {
    @prop({ required, index }) 
    login!: string;

    @prop({ required }) 
    password!: string;

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
    static encodePassword(this: UserModel, password: string) {
        const hash = Crypto.createHmac('sha512', Config.PasswordSalt);
        hash.update(password);
        return hash.digest('hex');
    }
}


export const User = new UserTG().getModelForClass(UserTG);
export const UserTryCrud = new TryCrud(User);

export type UserData  = TypegooseDocProperties<UserTG>;
export type UserModel = ModelType<UserTG> & typeof UserTG;
export type UserDoc   = InstanceType<UserModel>;