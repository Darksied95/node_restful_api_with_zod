import { FilterQuery, QueryOptions } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

export async function createProduct(input: ProductInput) {
    return await ProductModel.create(input)
}
