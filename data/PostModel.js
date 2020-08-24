import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import { User } from './UserModel';

class Post extends Model {
}

Post.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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

const getPostById = async (id) => await Post.findOne({
  where: {
    id,
  },
});

const removePostById = async (id) => await Post.destroy({
  where: {
    id,
  },
});

const updatePost = async ({ text, id }) => {
  await Post.update({ text },
    {
      where: {
        id,
      },
    });
  const post = await getPostById(id);

  return post.toJSON();
};

const getAllPosts = async () => {
  const posts = await Post.findAll();

  return posts.map(post => post.toJSON());
};

const createPost = async (text, userId) => {
  const post = await Post.create({
    text,
    userId,
  });

  return post.toJSON();
};

export { createPost, getAllPosts, getPostById, updatePost, removePostById };
