import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connection } from "@/utils/db";
import Conference from "@/models/Conference";
import { NextResponse } from "next/server";
import User from "@/models/User";

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

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    await connection();
    const user = await User.findOne({ email });

    const papers = await Conference.find({ dept: user.dept });

    return new NextResponse(JSON.stringify(papers), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching papers: " + error, { status: 500 });
  }
};

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await connection();
    await Conference.findByIdAndDelete(id);
    const updatedPapers = await Conference.find();
    return new NextResponse(JSON.stringify(updatedPapers), { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting paper: ", error, { status: 500 });
  }
};