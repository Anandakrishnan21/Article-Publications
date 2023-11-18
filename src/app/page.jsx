import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginPageContent from "@/components/loginPage/LoginPageContent";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return (
    <>
      <LoginPageContent />
    </>
  );
}