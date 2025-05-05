import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { supabase } from "@/utils/supabase"

const prisma = new PrismaClient()

interface UpdateCategoryRequestBody {
  name: string
  posts: { id: number}[]
}

export const GET  = async (
  request: NextRequest,
  { params } : {params: {id: string}},
) => {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

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

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  const { id } = params
  const { name, posts }: UpdateCategoryRequestBody = await request.json()

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    })

    await prisma.postCategory.deleteMany({
      where: {
        categoryId: parseInt(id),
      },
    })

    for (const post of posts) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id
        }
      })
    }

    return NextResponse.json({ status: 'OK', category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string} },
) => {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })
  
  const { id } = params

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json({ status: 'OK'}, { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status: 400})
  }
}