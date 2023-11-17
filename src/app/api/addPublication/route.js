import { NextResponse } from "next/server";
import { connection } from "@/utils/db";
import Paper from "@/models/Paper";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  try {
    const {
      title,
      author1,
      author2,
      author3,
      author4,
      author5,
      dept,
      journal,
      month,
      pubYear,
      issn,
      vol,
      issue,
      pageno,
      doi,
    } = await req.json();

    await connection();
    await Paper.create({
      email,
      title,
      author1,
      author2,
      author3,
      author4,
      author5,
      dept,
      journal,
      month,
      pubYear,
      issn,
      vol,
      issue,
      pageno,
      doi,
    });

    return NextResponse.json({ message: "Paper added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while submission." },
      { status: 500 }
    );
  }
}
