import { Usuario } from "../usuario";

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}
