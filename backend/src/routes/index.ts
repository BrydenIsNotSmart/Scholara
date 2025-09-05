import { infoGet } from "../handlers/index/index";

export const routes = {
  "/": {
    GET: (req: Request) => infoGet(req),
  },
};
