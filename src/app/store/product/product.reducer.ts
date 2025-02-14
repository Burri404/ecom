import { createReducer, on } from "@ngrx/store"
import { ProductActions } from './product.action'


export interface Product {
    productId : number,
    name: string,
    color: string,
    brand: string
}

export interface ProductState {
    products : Product[],
    error: string,
    productCount: number
}

export const initialState: ProductState = {
    products: [],
    productCount: 0,
    error: '',
}

export const productReducer = createReducer(
    initialState,
    on(ProductActions.productSuccess, (state, action: any ) => ({
            ...state,
            products: action.products,
            productCount: action.products.length,
            error: ''
    })),
    on(ProductActions.productFailure, (state, action ) => ({
             ...state,
             products: [],
             productCount: 0,
             error: action.error
    }))
)

