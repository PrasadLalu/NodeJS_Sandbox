import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
    name: string;
    description?: string;
    logo?: string;
    status: boolean;
} 

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: null },
    logo: { type: String, default: null },
    status: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);
