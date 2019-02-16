import { buildSchema } from "type-graphql";
import * as Apollo      from 'apollo-server-express';
import { UserResolver } from "@graphql/user/resolver";




export async function makeApolloServer() {
    return new Apollo.ApolloServer({
        playground: true,
        introspection: true,
        schema: await buildSchema({
            resolvers: [UserResolver],
            emitSchemaFile: 'src/common/schema.graphql'
        })
        /** 
         * // Add user to context, when using authenication.
         * 
         * context: async (
         *     args: { req: Express.Request, res: Express.Response }
         * ): Promise<GqlV1Params.ResolveContext> => ({
         *     user: await authenticate(args.req)
         * })
         */
    });
}