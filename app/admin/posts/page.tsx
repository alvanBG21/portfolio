import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';

async function getPosts() {
  await connectDB();

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .select('title slug published createdAt views tags')
    .lean();

  return JSON.parse(JSON.stringify(posts));
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold gradient-text">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-purple-400">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-400">/{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        post.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaEye />
                      {post.views}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post._id}/edit`}
                        className="p-2 glass rounded-lg hover:bg-white/10 transition-all duration-300 text-blue-400"
                      >
                        <FaEdit />
                      </Link>
                      <button className="p-2 glass rounded-lg hover:bg-red-500/20 transition-all duration-300 text-red-400">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No posts yet</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                <FaPlus />
                Create Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
