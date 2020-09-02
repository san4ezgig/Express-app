import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import { ROLES } from '../constants';

class User extends Model {
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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

export default User;
