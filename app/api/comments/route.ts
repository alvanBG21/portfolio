import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

// GET comments for a post
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({
      postId,
      approved: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST create new comment
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { postId, author, email, content } = body;

    if (!postId || !author || !content) {
      return NextResponse.json(
        { error: 'Post ID, author, and content are required' },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      postId,
      author,
      email,
      content,
      approved: true, // Auto-approve for now
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
