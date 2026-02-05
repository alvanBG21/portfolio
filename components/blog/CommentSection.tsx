'use client';

import { useState } from 'react';
import { IComment } from '@/types';
import { format } from 'date-fns';
import { FaUser, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CommentSectionProps {
  postId: string;
  comments: IComment[];
}

export default function CommentSection({
  postId,
  comments: initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!author.trim() || !content.trim()) {
      setError('Name and comment are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author, email, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setAuthor('');
      setEmail('');
      setContent('');
      setSuccess(true);
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold mb-8">
        Comments <span className="text-gray-400">({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="glass rounded-xl p-6 mb-8"
      >
        <h4 className="text-xl font-bold mb-4">Leave a Comment</h4>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Comment <span className="text-red-400">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 resize-none"
            placeholder="Share your thoughts..."
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm mb-4">
            Comment posted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </button>
      </motion.form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <FaUser className="text-purple-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-bold text-purple-400">{comment.author}</h5>
                  <span className="text-sm text-gray-400">
                    {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>

                <p className="text-gray-300">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
