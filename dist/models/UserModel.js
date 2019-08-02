"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        //Aqui fica a definição das regras de cada atributo
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        //opções de definição do módulo, nomes de tabelas e criação
        tableName: 'users',
        hooks: {
            //gatilhos do BD
            beforeCreate: (user, options) => {
                //criptografar a senha do usuário antes da criação dele, usando bcryptJs
                const salt = bcryptjs_1.genSaltSync(); //<-- valor randomico adicionado ao hash da senha
                user.password = bcryptjs_1.hashSync(user.password, salt); //<-- criptografando de fato
            },
            beforeUpdate: (user, options) => {
                if (user.changed('password')) {
                    const salt = bcryptjs_1.genSaltSync(); //<-- valor randomico adicionado ao hash da senha
                    user.password = bcryptjs_1.hashSync(user.password, salt); //<-- criptografando de fato 
                }
            }
        }
    });
    User.associate = (models) => { };
    User.prototype.isPassword = (encodedPassword, password) => {
        return bcryptjs_1.compareSync(password, encodedPassword); //<-- aqui ele compara se é o password, descriptografa
    };
    return User;
};
