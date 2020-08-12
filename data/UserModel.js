import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

const createUser = async () => {
  await sequelize.sync();
  const jane = await User.create({
    firstName: 'janedoe',
  });
  console.log(jane.toJSON());
};

export { createUser };
