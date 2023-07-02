import { Model, DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_URL, {})

export class Goal extends Model {}

Goal.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            nullable: false,
            defaultValue: Sequelize.UUIDV4,
        },
        user_id: DataTypes.STRING,
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        description: DataTypes.STRING,
        deadline: DataTypes.DATE,
        options: DataTypes.JSON,
        status: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            nullable: true,
        },
    },
    { sequelize, timestamps: false }
)
