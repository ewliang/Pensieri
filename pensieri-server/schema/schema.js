const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
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
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

// Category Type
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        permalink: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
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
        category: { type: CategoryType },
        isFeatured: { type: GraphQLBoolean },
        isPublished: { type: GraphQLBoolean },
        author: { type: UserType },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
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
                id: { type: GraphQLID },
                permalink: { type: GraphQLString }
            },
            resolve(parent, args) {
                var category = new Promise((resolve, reject) => {
                    if(args.id != null) {
                        Category.findById(args.id, (err, data) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    } else if(args.permalink != null) {
                        Category.findOne({ permalink: args.permalink }, (err, data) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    }
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
                id: { type: GraphQLID },
                permalink: { type: GraphQLString }
            },
            resolve(parent, args) {
                var post = new Promise((resolve, reject) => {
                    if(args.id != null) {
                        Post.findById(args.id, (err, data) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    } else if(args.permalink != null) {
                        Post.findOne({ permalink: args.permalink }, (err, data) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    }
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
        // User
        createUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email
                });
                return user.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new Promise((resolve, reject) => {
                    User.findOneAndUpdate(args.id, { $set:
                        {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email
                        }
                    }, { new: true }, (err, data) => { //New:true is so data returns the modified document. By default it's false.
                        if(err) {
                          console.log("Error occurred while attempting to update user with id [" + args.id + "]");
                          reject(err);
                        } else {
                          resolve(data);
                        }
                    });
                });
                return user;
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                User.findByIdAndDelete(args.id, (err) => {
                    if(err) {
                        console.error(err);
                        return err;
                    } else {
                        console.log("Successfully deleted user: " + args.id);
                    }
                });
            }
        },
        // Category
        createCategory: {
            type: CategoryType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                permalink: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString }
            },
            resolve(parent, args) {
                let category = new Category({
                    title: args.title,
                    permalink: args.permalink,
                    description: args.description
                });
                return category.save();
            }
        },
        updateCategory: {
            type: CategoryType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                permalink: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parent, args) {
                var category = new Promise((resolve, reject) => {
                    Category.findOneAndUpdate(args.id, { $set:
                        {
                          title: req.body.title,
                          description: req.body.description
                        }
                      }, { new: true }, (err, data) => { //New:true is so data returns the modified document. By default it's false.
                        if(err) {
                          console.log("Error occurred while attempting to update category with id [" + args.id + "]");
                          reject(err);
                        } else {
                          resolve(data);
                        }
                    }); 
                });
                return category;
            }
        },
        deleteCategory: {
            type: CategoryType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Category.findByIdAndDelete(args.id, (err) => {
                    if(err) {
                        console.error(err);
                        return err;
                    } else {
                        console.log("Successfully deleted category: " + args.id);
                    }
                });
            }
        },
        // Post
        createPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                permalink: { type: new GraphQLNonNull(GraphQLString) },
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
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                permalink: { type: GraphQLString },
                isPublished: { type: GraphQLBoolean },
                isFeatured: { type: GraphQLBoolean },
                body: { type: GraphQLString }
            },
            resolve(parent, args) {
                var post = new Promise((resolve, reject) => {
                    Post.findOneAndUpdate(args.id, { $set:
                        {
                          title: args.title,
                          body: args.body,
                          isPublished: args.isPublished,
                          isFeatured: args.isFeatured
                        }
                      }, { new: true }, (err, data) => { //New:true is so data returns the modified document. By default it's false.
                        if(err) {
                          console.log("Error occurred while attempting to update post with id [" + args.id + "]");
                          reject(err);
                        } else {
                          resolve(data);
                        }
                    });
                });
                return post;
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Post.findByIdAndDelete(args.id, (err) => {
                    if(err) {
                        console.error(err);
                        return err;
                    } else {
                        console.log("Successfully deleted post: " + args.id);
                    }
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});