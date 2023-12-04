import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connection } from "@/utils/db";
import Conference from "@/models/Conference";
import { NextResponse } from "next/server";

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
      conference,
      month,
      pubYear,
      isbn,
      doi,
    } = await req.json();

    await connection();
    await Conference.create({
      email,
      title,
      author1,
      author2,
      author3,
      author4,
      author5,
      dept,
      conference,
      month,
      pubYear,
      isbn,
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