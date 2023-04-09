import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  listeningPort: process.env.API_PORT,
  listeningIp: process.env.API_HOST,
  environment: process.env.NODE_ENV,
}));
