"use client";

import { logout } from "../../actions/strava";
import { env } from "../../env";
import { useAthleteData } from "../../Providers/AuthProvider";

interface indexProps {}

function Navbar({}: indexProps) {
  const athlete = useAthleteData();
  const loginUrl = `https://www.strava.com/oauth/authorize?client_id=${env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&redirect_uri=${env.NEXT_PUBLIC_BASE_URL}/api/strava-return&response_type=code&scope=activity:read`;

  return (
    <div>
      <div>
        {athlete ? (
          <>
            <h3>{athlete.username}</h3>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => (window.location.href = loginUrl)}>
            login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
