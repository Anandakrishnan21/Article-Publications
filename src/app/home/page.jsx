import { getServerSession } from "next-auth";
import DisplayAllPapers from "@/components/homePage/DisplayAllPapers";

export default async function HomePage() {
  return (
    <div className="h-screen">
      <DisplayAllPapers />
    </div>
  );
}