export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  categories: Array<string>;
  content: string;
}

export type PostResponse = {
  post: Post;
}

export type PostsResponse = {
  posts: Array<Post>
}

export type PostDetailsProps = {
  params: {
    id: string;
  }
}