import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connection } from "@/utils/db";

export async function POST(req) {
  try {
    const { name, email, password, scholar, dept, orcid, scopus } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection();
    await User.create({ name, email, password: hashedPassword, dept, orcid, scopus, scholar  });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}