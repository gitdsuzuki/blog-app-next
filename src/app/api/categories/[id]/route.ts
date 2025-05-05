import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET  = async (
  request: NextRequest,
  { params } : {params: {id: string}},
) => {
  const { id } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
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
    })

    return NextResponse.json({ status: 'OK', category: category }, { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status: 400})
  }
}
