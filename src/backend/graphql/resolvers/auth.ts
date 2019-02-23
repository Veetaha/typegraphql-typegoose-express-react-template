import * as I from '@modules/interfaces';
import { User } from '@models/user';
import { 
    Resolver,
    Arg,
    Mutation
} from 'type-graphql';
import { LoginRequestType  } from '@graphql/types/login-request-type';
import { LoginResponseType } from '@graphql/types/login-response-type';
import { nullable } from '@modules/flags';


@Resolver()
export class AuthResolver {
   
    @Mutation(_type => LoginResponseType, {nullable})
    async login(@Arg('req') credentials: LoginRequestType): Promise<I.Maybe<LoginResponseType>> {

        const user = await User.findByCredentials(credentials);

        return user == null ? null : { jwt: user.makeJWT(), user };
    }
    
}

