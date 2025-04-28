import { Metadata } from "next";
import GetGpxRoute from "../modules/GetGpxRoute";

export const metadata: Metadata = {};

interface PageProps {}

async function Page({}: PageProps) {
  return (
    <main>
      <GetGpxRoute />
    </main>
  );
}

export default Page;
