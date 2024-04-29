import User from "@/models/User";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, email } = await req.json();
  await connection();
  await User.create({ email, name });
  return NextResponse.json(
    { message: "user created successfully" },
    { status: 201 }
  );
};
