import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json({ message: "Missing name, email, or password" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email is already exists" }, { status: 409 })
    }

    const hashPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword
      }
    })

    const { password: passwordNewUser, ...rest } = newUser

    return NextResponse.json({ user: rest, message: "user created succesfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}