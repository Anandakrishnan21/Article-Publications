import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connection } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const { name, email, password, scholar, dept, orcid, scopus, imgUrl } =
      await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection();
    await User.create({
      name,
      email,
      password: hashedPassword,
      dept,
      orcid,
      scopus,
      scholar,
      imgUrl,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await connection();
    const user = await User.findOne({ email });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching papers: " + error, { status: 500 });
  }
}
