'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IPost } from '@/types';
import { format } from 'date-fns';
import { FaClock, FaEye, FaTag } from 'react-icons/fa';

interface BlogCardProps {
  post: IPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-purple-400 mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <FaClock size={14} />
              <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaEye size={14} />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full flex items-center gap-1"
                >
                  <FaTag size={10} />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
