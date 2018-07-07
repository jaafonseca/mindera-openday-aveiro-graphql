const express = require('express');
const express_graphql = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLBoolean} = require('graphql');
const Mockdata = require('./mock');

const BookType = new GraphQLObjectType({
  name: 'BookType',
  description: 'Describes a book',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve: (root, args) => Mockdata.getAuthor(root.id)
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'AuthorType',
  description: 'Describes an author',
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query structure for retrieving books',
    fields: () => ({
        books: {
            description: 'Returns a List of Books',
            type: new GraphQLList(BookType),
            resolve: (root, args) => Mockdata.getBooks(root, args)
        }
    })
});

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: new GraphQLSchema({
        query: QueryType
    }),
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
