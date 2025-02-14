import { createReducer, on, State } from "@ngrx/store";
import { categoryActionFailure, categoryActionSuccess } from "./category.action";

export interface CategoryState {
     categories: string[],
     currentCategory: string,
     error: string
}

export const initialState: CategoryState = {
    categories: [],
    currentCategory: '',
    error: ''
}

export const categoryReducer = createReducer(initialState, 
  on(categoryActionSuccess, (state, action )=> {
     return {
         ...state,
         categories: action.categories,
         error: '',
     };
  }),
  on(categoryActionFailure, (state, action)=> {
      return {
         ...state,
         categories: [],
         error: action.error
      };
  })
)
