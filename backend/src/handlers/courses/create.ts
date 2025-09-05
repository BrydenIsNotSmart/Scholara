import { SchoolName } from "../../config";

export async function courseCreatePost(
  req: Request,
  userId: string
): Promise<Response> {
  console.log(req.headers);

  return Response.json({
    success: true,
    message: `Course created for ${SchoolName}`,
    createdBy: userId,
  });
}
