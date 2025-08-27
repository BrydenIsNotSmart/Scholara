import { SchoolName } from "../../config";

export async function info(req: Request): Promise<Response> {
  const jsonInfo = {
    name: "Scholara",
    version: "0.1.0",
    description: "Backend service for Scholara",
    author: "Bryden Calaway",
    license: "MIT",
    school_name: SchoolName,
  };
  return new Response(JSON.stringify(jsonInfo), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
