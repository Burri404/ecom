import { effect, Injectable } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap } from "rxjs";
import * as actions from "../../store/category/category.action"

@Injectable()
export class CategoryEffects {
     constructor(private readonly categoryService: CategoryService, private actions$ : Actions){
     }

     loadCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.getCategoriesActions),
            exhaustMap(() => this.categoryService.getCategories().pipe(
            map(categories => actions.categoryActionSuccess(categories)),
            catchError(() => EMPTY)
            ))
            )});
    }