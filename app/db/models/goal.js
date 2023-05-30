import { Model, DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_URL, {})

export class Goal extends Model {}

Goal.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            nullable: false,
        },
        user_id: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        options: DataTypes.JSON,
        status: DataTypes.STRING,
    },
    { sequelize, timestamps: false }
)
