import { Metadata } from "next";
import CloudscapeLayout from "./CloudscapeLayout";

const title = 'Community Dragon Search';
const description = 'Advanced search for Community Dragon files';
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
  },
}

export default async function RootPage() {
  return <CloudscapeLayout />
};