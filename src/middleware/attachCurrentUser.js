import { findUserByEmail } from '../services/userService';
import { ERROR_MESSAGES } from '../constants';

export default async (req, res, next) => {
  const { data: { email } = {} } = req.token || {};

  try {
    const userRecord = await findUserByEmail(email);

    if (!userRecord) {
      return res.status(401).end(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    req.currentUser = userRecord;
  } catch (e) {
    return res.status(401).end(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return next();
}
