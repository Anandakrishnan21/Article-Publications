import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PublicationForm from "@/components/publicationForms/PublicationForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UploadPage = async () => {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/");
  // }
  return <PublicationForm />;
};

export default UploadPage;
