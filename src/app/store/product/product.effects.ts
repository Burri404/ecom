import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { ProductActions } from "./product.action";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Product} from './product.action';

export const loadProducts = createEffect(
    (actions$ = inject(Actions),  productService = inject(ProductService) ) => {
        return actions$.pipe(
            ofType(ProductActions.loadProduct),
            exhaustMap(() => productService.getProducts('jewelery').pipe(
                    tap((data) => console.log(data)),
                    map((products: any) => ProductActions.productSuccess({products})),
                    catchError(error => of(ProductActions.productFailure(error)))
                 )
            )
        );
    },
  { functional: true }
);