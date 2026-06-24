import mongoose, { Schema, type Document } from "mongoose";
import type { Gallery } from "@riffyh/commons";
import { TagType } from "@riffyh/commons";

export interface GalleryDocument extends Gallery, Document {
  id: string; // override Mongoose's Document id which is `any` by default
}

const ImageSchema = new Schema(
  {
    src: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false },
);

const OrderedImageSchema = new Schema(
  {
    src: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
);

const TagSchema = new Schema(
  {
    id: { type: String, required: true },
    key: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(TagType), required: true },
  },
  { _id: false },
);

const GallerySchema = new Schema<GalleryDocument>(
  {
    id: { type: String, required: true },
    key: { type: String, required: true },
    title: {
      display: { type: String, required: true },
      original: { type: String, default: null },
    },
    cover: { type: ImageSchema, required: true },
    pages: { type: [OrderedImageSchema], required: true },
    tags: { type: [TagSchema], required: true },
  },
  { timestamps: true },
);

// Create indexes to optimize search and queries
GallerySchema.index({ id: 1, key: 1 }, { unique: true }); // A gallery should be unique by id and key
GallerySchema.index({ "title.display": "text", "tags.name": "text" }); // Text index for simple search, though we might use regex for advanced query
GallerySchema.index({ createdAt: -1 });

export const GalleryModel =
  mongoose.models.Gallery || mongoose.model<GalleryDocument>("Gallery", GallerySchema);
