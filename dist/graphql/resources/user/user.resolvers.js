"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = {
    User: {
        posts: (user, { first = 10, offset = 0 }, { db }, info) => {
            return db.Post
                .findAll({
                where: { author: user.get('id') },
                limit: first,
                offset: offset
            });
        },
    },
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db.User
                .findAll({
                limit: first,
                offset: offset
            });
        },
        user: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.User
                .findById(id)
                .then((user) => {
                if (!user) {
                    throw new Error(`User with id ${id} not found!`);
                }
                else {
                    return user;
                }
            });
        },
    },
    Mutation: {
        createUser: (parent, args, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User
                    .create(args.input, { transaction: t });
            });
        },
        updateUser: (parent, args, { db }, info) => {
            const id = parseInt(args.id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    else {
                        return user.update(args.input, { transaction: t });
                    }
                });
            });
        },
        updateUserPassword: (parent, args, { db }, info) => {
            const id = parseInt(args.id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    else {
                        return user.update(args.input, { transaction: t })
                            .then((user) => !!user);
                    }
                });
            });
        },
        deleteUser: (parent, args, { db }, info) => {
            const id = parseInt(args.id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(args.id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    else {
                        return user.destroy({ transaction: t })
                            .then(user => !!user);
                    }
                });
            });
        },
    }
};
