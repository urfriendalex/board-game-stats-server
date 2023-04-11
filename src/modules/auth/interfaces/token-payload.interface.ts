interface TokenPayload {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

export default TokenPayload;
