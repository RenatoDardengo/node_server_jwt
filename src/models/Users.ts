    import { DataTypes, Model } from 'sequelize';
    const {sequelize} = require("@src/config/sequelize");


    class Users extends Model {
        public id!: number;
        public name!: string;
        public password!: string;
        public level!: number;
        public phone_number!: string;
        public job_title!: string;
        public status!: boolean;
        public created_date!: Date;
        public updated_date!: Date;
    }

    Users.init(
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
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            level: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            job_title: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            created_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            
        },
        {
            sequelize,
            modelName: 'Tb_users',
            timestamps: false,
            freezeTableName: true,
        }
    );

    export default Users;