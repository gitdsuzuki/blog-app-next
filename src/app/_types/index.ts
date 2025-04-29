export type Post = {
  id: string
  title: string
  content: string
  thumbnailUrl: string
  createdAt: string
  categories: { id: string }[]
  postCategories: { category: Category }[];
}

export type Category = {
  id: string
  name: string
  posts: { id: string; title: string, postId: string}[]
}

export type PostsResponse = {
  posts: Array<Post>
}

export type CategoriesResponse = {
  categories: Array<Category>
}

export type PostResponse = {
  post: Post
}

export type CategoryResponse = {
  category: Category
}

export type PostDetailsProps = {
  params: {
    id: string;
  }
}