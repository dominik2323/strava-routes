import GetGpxRoute from "@/modules/GetGpxRoute";
import { Metadata } from "next";

export const metadata: Metadata = {};

interface PageProps {}

async function Page({}: PageProps) {
  return (
    <main className='px-4'>
      <GetGpxRoute />
    </main>
  );
}

export default Page;
