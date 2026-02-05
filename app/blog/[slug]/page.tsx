import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaClock, FaEye, FaTag, FaArrowLeft } from 'react-icons/fa';
import CommentSection from '@/components/blog/CommentSection';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import Comment from '@/models/Comment';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string) {
  await connectDB();

  const post = await Post.findOne({ slug, published: true }).lean();

  if (!post) {
    return null;
  }

  return JSON.parse(JSON.stringify(post));
}

async function getComments(postId: string) {
  await connectDB();

  const comments = await Comment.find({ postId, approved: true })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(comments));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const comments = await getComments(post._id);

  return (
    <div className="min-h-screen py-20">
      <article className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-blue-400 transition-colors duration-300 mb-8"
        >
          <FaArrowLeft />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FaClock />
            <span>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEye />
            <span>{post.views} views</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-semibold">
              {post.author.name}
            </span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
              >
                <FaTag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: '#e5e5e5',
          }}
        />

        {/* Comment Section */}
        <CommentSection postId={post._id} comments={comments} />
      </article>
    </div>
  );
}
