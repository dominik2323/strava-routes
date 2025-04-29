"use client";

import { AthleteData } from "@/actions/strava";
import { createContext, ReactNode, useContext } from "react";

export const AuthContext = createContext<AthleteData>(null);

export function AuthProvider({
  data,
  children,
}: {
  data: AthleteData;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAthleteData() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAthleteData hook must be used within AuthProvider");
  }

  return ctx;
}
