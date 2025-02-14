import { createAction, props } from "@ngrx/store";

export const getCategoriesActions = createAction('[Category] Get Categories');

export const categoryActionSuccess = createAction(
    '[Category] Get Categories Success]',
    (categories: string[]) => ({categories})
);

export const categoryActionFailure = createAction(
    '[Category] Get Categories Failure]',
    (error: string) => ({error})
)