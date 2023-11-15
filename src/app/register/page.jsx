import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import RegistrationPageContent from "@/components/registerPage/RegistrationPageContent";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return <RegistrationPageContent/>;
}
