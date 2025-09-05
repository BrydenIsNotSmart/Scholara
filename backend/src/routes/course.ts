import { courseCreatePost } from "../handlers/";
import { requireAuth } from "../middleware/auth";

export const routes = {
  "/courses/create": {
    POST: requireAuth(courseCreatePost),
  },
};
