import ROLES from '../constants/roles';

const GET_ALL_USER = 'GET_ALL_USER';
const REMOVE_POST = 'GET_ALL_USER';

const PERMISSIONS = {
  [ROLES.admin]: [GET_ALL_USER, REMOVE_POST],
  [ROLES.author]: [],
};

export { PERMISSIONS, GET_ALL_USER, REMOVE_POST };
