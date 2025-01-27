import mongoose from "mongoose";
import { UserDoc } from "./user";
import { CommentDoc } from "./comment";

export interface ArticleDoc extends mongoose.Document {
  title: string;
  content: string;
  images: Array<{ src: string }>;
  comments: Array<CommentDoc>;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  images: Array<{ src: string }>;
}

export interface ArticleModel extends mongoose.Model<ArticleDoc> {
  build(dto: CreateArticleDto): ArticleDoc
}

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: [
    { src: { type: String, required: true } }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

articleSchema.statics.build = (createArticleDto: CreateArticleDto) => {
  return new Article(createArticleDto);
}

const Article = mongoose.model<ArticleDoc, ArticleModel>("Article", articleSchema);
export default Article;
