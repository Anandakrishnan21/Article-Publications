"use client";
import { SidebarProvider } from "@/context/SidebarContext";
import Header from "../common/Header";
import { SideBar } from "../common/SideBar";
import DisplayAllPapers from "./DisplayAllPapers";

export default function HomePage() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header/>
        <div className="bg-stone-100 h-screen grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            <DisplayAllPapers/>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
