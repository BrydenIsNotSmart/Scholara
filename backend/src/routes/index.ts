import { info } from "../handlers/index/";

export const routes = {
  "/": {
    GET: (req: Request) => info(req),
  },
};
