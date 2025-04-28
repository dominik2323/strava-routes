import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { loginUser } from "../../../actions/strava";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  await loginUser(code);
  return redirect("/");
}
