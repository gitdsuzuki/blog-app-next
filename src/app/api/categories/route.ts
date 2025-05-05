import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: {
          include: {
            post: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc'
      },
    })

    return NextResponse.json({ status: 'OK', categories: categories }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status: 400 })
  }
}