"use client";

import { getRouteGpx, GetRouteGpxResponse } from "@/actions/strava";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useRef, useState } from "react";

interface GetGpxRouteProps {}

function getRouteId(routeUrl: string) {
  const regex = /\/routes\/(\d+)/;
  const match = routeUrl.match(regex);
  if (!match) {
    return null;
  }
  return match[1];
}

function GetGpxRoute({}: GetGpxRouteProps) {
  const [gpx, setGpx] = useState<GetRouteGpxResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setGpx(null);
    const formData = new FormData(formRef.current);
    const routeUrl = formData.get("routeUrl");
    const routeId = getRouteId(routeUrl?.toString() ?? "");
    if (!routeId) {
      return;
    }
    getRouteGpx(routeId).then((gpx) => {
      setGpx(gpx);
    });
  };

  return (
    <div className='flex flex-col gap-2 max-w-md mx-auto'>
      {!gpx ? (
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className='flex flex-col gap-2 max-w-md bg-primary-foreground p-4 rounded-md mt-4 border border-border'
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='routeUrl'>Route URL</Label>
            <Input type='text' name='routeUrl' />
          </div>
          <Button type='submit'>Generate GPX</Button>
        </form>
      ) : (
        <Button asChild className='w-full mt-10'>
          <a href={gpx.base64} download={gpx.filename}>
            Download route {gpx.filename}
          </a>
        </Button>
      )}
    </div>
  );
}

export default GetGpxRoute;
