"use client";

import { logout } from "@/actions/strava";
import { Button } from "@/components/Button";
import { env } from "@/env";
import { useAthleteData } from "@/Providers/AuthProvider";

interface indexProps {}

function Navbar({}: indexProps) {
  const athlete = useAthleteData();
  const loginUrl = `https://www.strava.com/oauth/authorize?client_id=${env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&redirect_uri=${env.NEXT_PUBLIC_BASE_URL}/api/strava-return&response_type=code&scope=activity:read`;

  return (
    <div className='flex justify-between items-center fixed top-0 left-0 right-0 bg-primary-foreground h-16 border-b border-border px-4'>
      {athlete ? (
        <>
          <h3>{athlete.username}</h3>
          <Button onClick={logout} variant='outline'>
            logout
          </Button>
        </>
      ) : (
        <Button onClick={() => (window.location.href = loginUrl)}>login</Button>
      )}
    </div>
  );
}

export default Navbar;
