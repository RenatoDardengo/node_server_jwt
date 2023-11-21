    const db = require("@src/config/database");
    import { DataTypes, Model } from 'sequelize';
    const {sequelize} = require("@src/config/sequelize");


    class UserAdmin extends Model {
        public id!: number;
        public name!: string;
        public password!: string;
        public isAdmin!: number;
        public permission!: number;
    }

    UserAdmin.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            permission: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Admin',
            timestamps: false,
            freezeTableName: true,
        }
    );

    export default UserAdmin;