import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  accessTokenExpirationTime: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION),
  authSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
}));
