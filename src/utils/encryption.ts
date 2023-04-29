import * as bcrypt from 'bcrypt';
import { User } from 'src/users/Schemas/user.schema';

export const hashPassword = async (user: User) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return user;
};

export const comparePassword = async (user: User, password: string) => {
  return await bcrypt.compare(password, user.password);
};
