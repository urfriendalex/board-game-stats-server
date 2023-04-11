import { User } from '../../user/user.entity';

export interface RequestBody extends ReadableStream<Uint8Array> {
  [key: string]: any;
}

interface RequestWithUser extends Request {
  user: User;
  body: RequestBody;
}

export default RequestWithUser;
