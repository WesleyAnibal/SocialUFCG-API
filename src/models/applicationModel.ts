import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import * as Sequelize from 'sequelize';
import { ModelsInterface } from "../interfaces/ModelsInterface";


export interface ApplicationAttributes {
    id?: number;
    name?: string;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApplicationInstance extends Sequelize.Instance<ApplicationAttributes> {}

export interface ApplicationModel extends BaseModelInterface, Sequelize.Model<ApplicationInstance, ApplicationAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ApplicationModel => {

    const Application: ApplicationModel = 
        sequelize.define('Application',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },{
            tableName: 'applications'
    });
    Application.associate = (models: ModelsInterface): void => {
        Application.belongsTo(models.User,{
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };

    return Application;
}
