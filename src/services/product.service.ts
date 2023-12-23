import { FilterQuery, QueryOptions } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

export async function createProduct(input: ProductInput) {
    return await ProductModel.create(input)
}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    return await ProductModel.findOne(query, {}, options)
}
