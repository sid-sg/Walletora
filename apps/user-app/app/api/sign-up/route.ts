import { NextResponse } from 'next/server';
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { signupSchema } from "@repo/schema/userSchema"

export async function POST(req: Request) {

  try {
    const { name, email, plainPassword } = await req.json();

    if (!name || !email || !plainPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
      signupSchema.parse({
        name, email, plainPassword
      });

    }
    catch (e: any) {
      console.log(e);

      return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
    }
    // const validSchema =
    // if(!validSchema){
      // const errors = validSchema.error.errors.map(err => ({
      //   field: err.path[0], 
      //   message: err.message
      // }));
    // }

    const existingUser = await db.user.findFirst({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists. Please sign in." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    });

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json({ message: "Error during sign-up" }, { status: 500 });
  }
}