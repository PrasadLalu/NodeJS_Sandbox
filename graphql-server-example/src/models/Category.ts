import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description?: string;
    status: boolean;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: null },
    status: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
