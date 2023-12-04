import { connection } from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Conference from "@/models/Conference";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  try {
    await connection();
    const { title,isbn } = await req.json();
    const paper = await Conference.findOne({ email,title,isbn }).select("_id");
    console.log("paper: ", paper);
    return NextResponse.json({ paper });
  } catch (error) {
    console.log(error);
  }
}
