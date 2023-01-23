import {
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';
import Team from './Team.model';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayteamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'match',
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
);

Match.hasOne(Team, {
  foreignKey: 'id',
  sourceKey: 'homeTeamId',
  as: 'homeTeam',
});

Match.hasOne(Team, {
  foreignKey: 'id',
  sourceKey: 'awayTeamId',
  as: 'awayTeam',
});
