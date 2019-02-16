require('../build/backend/graphql/apollo-server.js')
    .makeApolloServer()
    .then(() => {
        console.log('Schema was genereated');
    })
