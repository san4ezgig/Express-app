import Post from '../models/post';

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
