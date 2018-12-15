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
        title: { type: GraphQLString, required: true },
        permalink: { type: GraphQLString, required: true },
        description: { type: GraphQLString }
    })
});

// Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString, required: true },
        permalink: { type: GraphQLString, required: true },
        body: { type: GraphQLString },
        category: { type: CategoryType },
        isFeatured: { type: GraphQLBoolean },
        isPublished: { type: GraphQLBoolean },
        author: { type: UserType }
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
                var user = new Promise((resolve, reject) => {
                    User.findById(args.id, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return user;
            }
        },
        users: {
            type: UserType,
            resolve(parent, args) {
                var users = new Promise((resolve, reject) => {
                    User.find({}, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return users;
            }
        },
        category: {
            type: CategoryType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                var category = new Promise((resolve, reject) => {
                    Category.findById(args.id, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return category;
            }
        },
        categories: {
            type: CategoryType,
            resolve(parent, args) {
                var categories = new Promise((resolve, reject) => {
                    Category.find({}, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return categories;
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                var post = new Promise((resolve, reject) => {
                    Post.findById(args.id, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return post;
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                var posts = new Promise((resolve, reject) => {
                    Post.find({}, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                return posts;
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