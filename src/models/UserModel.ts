import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

    const User: UserModel = 
        sequelize.define('User', {
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
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    //criptografar a senha do usuário antes da criação dele, usando bcryptJs
                    const salt = genSaltSync();//<-- valor randomico adicionado ao hash da senha
                    user.password = hashSync(user.password, salt); //<-- criptografando de fato
                },
                beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    if (user.changed('password')) {
                        const salt = genSaltSync();//<-- valor randomico adicionado ao hash da senha
                        user.password = hashSync(user.password, salt); //<-- criptografando de fato 
                    }
                }
            }
        });

        User.associate = (models: ModelsInterface): void => {};

        User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
            return compareSync(password, encodedPassword);//<-- aqui ele compara se é o password, descriptografa
        }
        
    return User;

};