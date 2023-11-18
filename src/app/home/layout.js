import Header from "@/components/common/Header";
import { SideBar } from "@/components/common/SideBar";
import { SidebarProvider } from "@/context/SidebarContext";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <body className= "dark:bg-neutral-950">
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="particles"
    >
      <SidebarProvider>
        <div className="max-h-screen flex flex-col">
          <Header />
          <div className="bg-stone-100 h-screen grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <SideBar />
            <div className="overflow-x-hidden">
              <div className=" box-border dark:bg-neutral-950">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
    </body>

  );
}
