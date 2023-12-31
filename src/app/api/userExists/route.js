import User from "@/models/User";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connection();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}