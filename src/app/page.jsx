import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import LoginPageContent from "@/components/loginPage/LoginPageContent";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <main>
      <LoginPageContent />
    </main>
  );
}