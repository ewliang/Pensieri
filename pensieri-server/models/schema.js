const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

// Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        permalink: { type: GraphQLString },
        body: { type: GraphQLString },
        category: { type: GraphQLString },
        isFeatured: { type: GraphQLBoolean },
        isPublished: { type: GraphQLBoolean },
        author: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                for(let i = 0; i < postMessage.length; i++) {
    
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});