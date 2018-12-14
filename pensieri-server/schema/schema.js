const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString, required: true },
        lastName: { type: GraphQLString, required: true },
        email: { type: GraphQLString, required: true }
    })
});

// Category Type
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        permalink: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

// Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        permalink: { type: GraphQLString },
        body: { type: GraphQLString },
        category: CategoryType,
        isFeatured: { type: GraphQLBoolean },
        isPublished: { type: GraphQLBoolean },
        author: UserType
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {

            }
        },
        users: {
            type: UserType,
            resolve(parent, args) {
                //return users
            }
        },
        category: {
            type: CategoryType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {

            }
        },
        categories: {
            type: CategoryType,
            resolve(parent, args) {
                //return categories
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                //return posts;
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                permalink: { type: GraphQLString },
                isPublished: { type: GraphQLBoolean },
                isFeatured: { type: GraphQLBoolean },
                body: { type: GraphQLString },
                category: { type: GraphQLString }
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title.trim(),
                    permalink: args.permalink,
                    isPublished: args.isPublished,
                    isFeatured: args.isFeatured,
                    body: args.body,
                    category: args.category
                });
                return post.save();
            }
        },
        updatePost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                isPublished: { type: GraphQLBoolean },
                isFeatured: { type: GraphQLBoolean },
                body: { type: GraphQLString }
            },
            resolve(parent, args) {
                
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});