import { DataTypes, Model, Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {})

export class Goal extends Model {}

Goal.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    },
    { sequelize }
)
;(async () => {
    await sequelize.sync()
})()
