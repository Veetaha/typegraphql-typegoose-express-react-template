import 'reflect-metadata'; // Polyfill required by Typegoose and TypeGraphQL
import { makeApolloServer } from '@graphql/apollo-server';

makeApolloServer();