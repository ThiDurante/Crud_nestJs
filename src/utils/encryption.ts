import * as bcrypt from 'bcrypt';
import { User } from 'src/users/Schemas/user.schema';

export const hashPassword = async (user: User) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return user;
};

export const comparePassword = async (
  user: { username: string; password: string },
  password: string,
) => {
  console.log('plain', password);
  console.log('encrypted', user.password);

  return await bcrypt.compare(password, user.password);
};
