import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    in_stock: boolean;
    category: mongoose.Types.ObjectId;
    brand: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    in_stock: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
}, {
    versionKey: false,
    timestamps: true,
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
