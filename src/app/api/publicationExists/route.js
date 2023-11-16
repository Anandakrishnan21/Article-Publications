import Paper from "@/models/Paper";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  try {
    await connection();
    const { title,issn } = await req.json();
    const paper = await Paper.findOne({ email,title,issn }).select("_id");
    console.log("paper: ", paper);
    return NextResponse.json({ paper });
  } catch (error) {
    console.log(error);
  }
}
