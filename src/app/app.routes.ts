import { Routes } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { provideState } from '@ngrx/store';
import { productFeature } from './store/product/product.selector';
import { provideEffects } from '@ngrx/effects';
import { loadProducts} from './store/product/product.effects';

export const routes: Routes = [
   // {path: '', redirectTo: 'home', pathMatch: 'full' },
   // { path: 'home', component: MainNavComponent}
     { 
        path: 'category/:CategoryName', loadComponent: () => import('./product/product.component'),
        data : { test: 'dfdf'},
        providers: [provideState(productFeature),
          provideEffects({loadProducts})]
     },
     ];