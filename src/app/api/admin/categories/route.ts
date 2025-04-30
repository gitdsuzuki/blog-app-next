import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export interface CreateCategoryRequestBody {
  name: string
  posts: {
    id: number
  }[]
}

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

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { name, posts } : CreateCategoryRequestBody = body

    const data = await prisma.category.create({
      data: {
        name
      },
    })

    for (const post of posts) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: data.id,
        },
      })
    }

    return NextResponse.json({
      status: 'OK',
      message: 'カテゴリーを作成しました',
      id: data.id
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message}, { status: 400})
    }
  }
}
