import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RegistrationPageContent from "@/components/registerPage/RegistrationPageContent";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return <RegistrationPageContent/>;
}
