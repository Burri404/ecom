import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { Product, ProductState, productReducer } from "./product.reducer";

export const productFeaturekey = 'Products';

export const selectProductState = createFeatureSelector<ProductState>(productFeaturekey);
export const selectProducts = createSelector(selectProductState,
    (state: ProductState) => state.products
);
export const selecterror = createSelector(selectProductState,
    (state: ProductState) => state.error
);

export const productFeature = createFeature(
    {
         name: productFeaturekey,
         reducer : productReducer
    }
);

