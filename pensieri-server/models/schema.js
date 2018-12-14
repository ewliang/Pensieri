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
const posts = [
    { id: "1", title: "Hello World", body: "Heyyyyy!!!!" },
    { id: "2", title: "Hello World2", body: "Heyyyyy!!!!2" }
];
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
                for(let i = 0; i < posts.length; i++) {
                    if(posts[i].id == args.id) {
                        return posts[i];
                    }
                }
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parentValue, args) {
                return posts;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});