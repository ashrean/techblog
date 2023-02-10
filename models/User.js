const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { beforeBulkCreate, beforeCreate, beforeUpdate } = require('./Comment');

class User extends Model{
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4]
                }
            }
        },
        {
            hooks: {
                beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10)
                    return newUserData;
                },
                beforeUpdate: async (updateUserData) => {
                    updateUserData.password = await bcrypt.hash(updateUserData.password, 10)
                    return updateUserData;
                },
            }
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'User',
        }
    );

    module.exports = User;
