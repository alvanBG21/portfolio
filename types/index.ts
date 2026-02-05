export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  _id: string;
  postId: string;
  author: string;
  email?: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  published?: boolean;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  slug?: string;
}

export interface CreateCommentInput {
  postId: string;
  author: string;
  email?: string;
  content: string;
}
