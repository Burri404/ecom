import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";


export interface Product{
     id: number,
     title: string,
     price: number,
     category: string,
     description: string,
     image: string
}

export const ProductActions = createActionGroup({
    source: 'Products',
    events: {
      'Load Product': emptyProps(),
      'Product Success' : props<{ products : string[] }>(),
      'Product Failure': props<{ error: ''}>()
    }
  });

// export const getProducts = createAction('Get All [Products]');
// export const productSuccess = createAction('Get All [Products] Success',
//     (products: Product[]) => ({products})
// )
