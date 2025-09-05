import { registerPost, loginPost } from "../handlers/";

export const routes = {
  "/auth/register": {
    POST: (req: Request) => registerPost(req),
  },
  "/auth/login": {
    POST: (req: Request) => loginPost(req),
  },
};
