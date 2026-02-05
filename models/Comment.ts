import mongoose, { Schema, model, models } from 'mongoose';

export interface IComment {
  _id: string;
  postId: mongoose.Types.ObjectId;
  author: string;
  email?: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post ID is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    approved: {
      type: Boolean,
      default: true, // Auto-approve for now, can add moderation later
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
CommentSchema.index({ postId: 1, createdAt: -1 });
CommentSchema.index({ approved: 1 });

const Comment = models.Comment || model<IComment>('Comment', CommentSchema);

export default Comment;
