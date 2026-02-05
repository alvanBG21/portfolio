'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import BlogCard from '@/components/blog/BlogCard';
import { IPost } from '@/types';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: '9',
    ...(search && { search }),
    ...(selectedTag && { tag: selectedTag }),
  });

  const { data, error, isLoading } = useSWR(
    `/api/posts?${queryParams.toString()}`,
    fetcher
  );

  const posts: IPost[] = data?.posts || [];
  const pagination = data?.pagination;

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Insights on software engineering, cloud architecture, and building
            scalable systems
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedTag('');
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedTag === ''
                    ? 'bg-purple-600 text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-purple-600 text-white'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="text-4xl text-purple-500 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">Failed to load blog posts</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && !error && posts.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                          page === pageNum
                            ? 'bg-purple-600 text-white'
                            : 'glass hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blog posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
