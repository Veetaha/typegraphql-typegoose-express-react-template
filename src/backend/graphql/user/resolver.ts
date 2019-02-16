// import * as Vts from 'vee-type-safe';
import * as I from '@modules/interfaces';
import { UserType, UserTryCrud } from '@models/user';
import { 
    Resolver,
    Query,
    Arg
} from 'type-graphql';


@Resolver(_of => UserType)
export class UserResolver { // implements ResolverInterface<UserData> {
    @Query(_returns => UserType)
    async getUser(@Arg('id') id: I.ObjectId) {
        return UserTryCrud.tryFindById(id);
    }
}

