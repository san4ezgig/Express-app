import { Model } from 'sequelize';
import User from './user';

export default (sequelize, DataTypes) => {
  class Post extends Model {
  }

  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
}
