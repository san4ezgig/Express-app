import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';

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

export default Post;
