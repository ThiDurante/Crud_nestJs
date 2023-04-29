import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

interface JwtPayload {
  _id: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default class Jwt {
  private readonly secret = process.env.secret;

  public generate(user: JwtPayload): string {
    const options: jwt.SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
    return jwt.sign(user, this.secret, options);
  }

  public verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
