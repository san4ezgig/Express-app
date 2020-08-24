import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import jwt from 'jsonwebtoken';
import { ROLES } from '../constants';
import * as argon2 from 'argon2';

class User extends Model {
}

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: ROLES.author,
  },
  lastName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User',
});

const generateToken = (user) => {
  const { dataValues: { id, firstName, email } } = user;

  const signature = process.env.tokenSecret;
  const expiration = '6h';

  return jwt.sign({
    data: {
      id,
      firstName,
      email,
    },
  }, signature, { expiresIn: expiration });
};

const createUser = async ({
                            lastName = '',
                            role,
                            email,
                            password,
                            firstName,
                          }) => {
  const passwordHashed = await argon2.hash(password);

  const user = await User.create({
    firstName,
    email,
    password: passwordHashed,
    lastName,
    role,
  });

  const { dataValues: { password: _, ...otherFields } } = user;

  return {
    user: {
      ...otherFields,
    },
    token: generateToken(user),
  };
};

const findUserByEmail = async (email) => await User.findOne({
  where: {
    email,
  },
});

const findUserById = async (id) => await User.findOne({
  where: {
    id,
  },
});

const login = async (email, password) => {
  const userRecord = await findUserByEmail(email);
  if (!userRecord) {
    throw new Error('User not found');
  }

  const { dataValues: { password: passwordForThisUser, ...otherFields } } = userRecord;
  const correctPassword = await argon2.verify(passwordForThisUser, password);
  if (!correctPassword) {
    throw new Error('Incorrect password');
  }

  return {
    user: {
      ...otherFields,
    },
    token: generateToken(userRecord),
  };
};

const getAllUsers = async () => {
  const usersList = await User.findAll();

  return usersList.map(user => user.dataValues).map(({ password, ...data }) => ({ ...data }));
};

export { createUser, findUserByEmail, findUserById, login, getAllUsers, User };
