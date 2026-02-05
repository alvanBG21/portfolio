import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import { FaFileAlt, FaComments, FaEye, FaPlus } from 'react-icons/fa';

async function getDashboardStats() {
  await connectDB();

  const [totalPosts, publishedPosts, totalComments, totalViews] =
    await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ published: true }),
      Comment.countDocuments(),
      Post.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
    ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalComments,
    totalViews: totalViews[0]?.total || 0,
  };
}

async function getRecentPosts() {
  await connectDB();

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title slug published createdAt views')
    .lean();

  return JSON.parse(JSON.stringify(posts));
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentPosts = await getRecentPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Total Posts</h3>
            <FaFileAlt className="text-purple-400 text-2xl" />
          </div>
          <p className="text-3xl font-bold gradient-text">{stats.totalPosts}</p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Published</h3>
            <FaFileAlt className="text-green-400 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-green-400">
            {stats.publishedPosts}
          </p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Comments</h3>
            <FaComments className="text-blue-400 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-blue-400">
            {stats.totalComments}
          </p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Total Views</h3>
            <FaEye className="text-cyan-400 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-cyan-400">{stats.totalViews}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>

        <div className="space-y-4">
          {recentPosts.map((post: any) => (
            <div
              key={post._id}
              className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-purple-400 mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{post.views} views</span>
                  <span
                    className={
                      post.published ? 'text-green-400' : 'text-yellow-400'
                    }
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <Link
                href={`/admin/posts/${post._id}/edit`}
                className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Edit
              </Link>
            </div>
          ))}

          {recentPosts.length === 0 && (
            <p className="text-center text-gray-400 py-8">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
