import { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProductModel } from "../models/product.models";

type requestBody = {
  name: string;
  price: Number;
};

const createProduct = (request: Request, response: Response) => {
  const { name, price }: requestBody = request.body;

  const product: IProductModel = new Product({
    id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
  });

  return product
    .save()
    .then((product: IProductModel) => response.status(201).json({ product }))
    .catch((error: Error) =>
      response
        .status(500)
        .json({ message: error.message || "Some error occurred" })
    );
};
const getProduct = (request: Request, response: Response) => {
  const productId: string = request.params.productId;

  return Product.findById(productId)
    .then((product: IProductModel | null) =>
      product
        ? response.status(200).json({ product })
        : response.status(404).json({ message: "Not Found product" })
    )
    .catch((error: Error) =>
      response
        .status(500)
        .json({ message: error.message || "Some error occurred" })
    );
};
const getAllProducts = (request: Request, response: Response) => {
  return Product.find()
    .then((products: IProductModel[]) =>
      response.status(200).json({ products })
    )
    .catch((error: Error) =>
      response
        .status(500)
        .json({ message: error.message || "Some error occurred" })
    );
};
const updateProduct = (request: Request, response: Response) => {
  const productId: string = request.params.productId;
  const { name, price }: requestBody = request.body;

  return Product.findById(productId)
    .then((product: IProductModel | null) => {
      if (product) {
        product.set({
          name: name,
          price: price,
          updateDate: new Date(),
        });

        return product
          .save()
          .then((product: IProductModel) =>
            response.status(201).json({ product })
          )
          .catch((error: Error) =>
            response.status(500).json({
              message: `Error updating product with id ${productId} - enter necessary values`,
            })
          );
      } else {
        response
          .status(404)
          .json({ message: `Not found product with id ${productId}` });
      }
    })
    .catch((error: Error) =>
      response
        .status(500)
        .json({ message: error.message || "Some error occurred" })
    );
};
const deleteProduct = (request: Request, response: Response) => {
  const productId: string = request.params.productId;

  return Product.findByIdAndDelete(productId)
    .then((product: IProductModel | null) =>
      product
        ? response.status(201).json({ message: "Product deleted" })
        : response.status(404).json({ message: "Not Found product" })
    )
    .catch((error: Error) =>
      response
        .status(500)
        .json({ message: error.message || "Some error occurred" })
    );
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
