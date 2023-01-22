import {
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'team',
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
);
