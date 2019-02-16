import { 
    Resolver, 
    ObjectType, 
    Field, 
    ResolverInterface, 
    FieldResolver, 
    Root,
    Query
} from 'type-graphql';
import { UserData } from '@models/user';

@ObjectType() 
export class UserType implements Partial<UserData> {
    @Field() login!:     string;
    @Field() init_date!: Date;    
}

@Resolver(_of => UserType)
export class UserResolver implements ResolverInterface<UserType> {
    @Query(_returns => UserType)
    getUser() {
        return { login: 'logogin', init_date: new Date };
    }
    

    @FieldResolver()
    login(@Root() user: UserType) {
        return user.login;
    }
}