import { loginUser } from "@/actions/strava";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  await loginUser(code);
  return redirect("/");
}
