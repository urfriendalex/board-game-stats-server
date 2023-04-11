import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  email: process.env.MAILER_EMAIL,
  password: process.env.MAILER_PASSWORD,
  host: process.env.MAILER_HOST,
}));
