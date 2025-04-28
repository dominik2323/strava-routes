"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import qs from "qs";
import { env } from "../env";

export interface AthleteData {
  access_token: string;
  refresh_token: string;
  username: string;
  expiresAt: number;
}

export async function getSession() {
  const session = await createSession();
  if (!session.username) return null;

  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expiresAt: session.expiresAt,
    username: session.username,
  };
}

export async function createSession() {
  return await getIronSession<AthleteData>(await cookies(), {
    cookieName: "session",
    password: env.AUTH_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export async function logout() {
  const session = await createSession();
  session.destroy();
}

export async function loginUser(code: string) {
  const res = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    body: qs.stringify({
      client_id: env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const result = await res.json();
  if (result.errors) {
    console.error("login failed", result.errors);
    return Response.json(result);
  }

  const session = await createSession();
  session.access_token = result.access_token;
  session.refresh_token = result.refresh_token;
  session.username = result.athlete.username;
  session.expiresAt = result.expires_at;
  await session.save();
}

export async function getRouteGpx(id: string) {
  const session = await getSession();
  const res = await fetch(
    `https://www.strava.com/api/v3/routes/${id}/export_gpx`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );
  const result = await res.arrayBuffer();
  const buffer = Buffer.from(result);

  const base64String = buffer.toString("base64");
  return `data:application/xhtml+xml;base64,${base64String}`;
}
