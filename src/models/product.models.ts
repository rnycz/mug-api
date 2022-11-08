import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  name: string;
  price: Number;
  updateDate: Date;
}

export interface IProductModel extends IProduct, Document {}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    price: { type: Number, required: true },
    updateDate: { type: Date },
  },
  {
    versionKey: false,
  }
);
export default mongoose.model<IProductModel>("Product", productSchema);
