"use client";

import { FormEvent, useRef, useState } from "react";
import { getRouteGpx } from "../actions/strava";

interface GetGpxRouteProps {}

function GetGpxRoute({}: GetGpxRouteProps) {
  const [gpx, setGpx] = useState<string>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const routeId = formData.get("routeId");
    getRouteGpx(routeId.toString()).then((gpx) => {
      setGpx(gpx);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type='text' name='routeId' />
      </form>
      {gpx && (
        <a href={gpx} download={`route_${Date.now()}.gpx`}>
          download
        </a>
      )}
    </div>
  );
}

export default GetGpxRoute;
