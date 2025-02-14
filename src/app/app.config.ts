import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { createFeature, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { categoryReducer } from './store/category/category.reducer';
import { CategoryEffects } from './store/category/category.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { categoryFeature } from './store/category/category.selector';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
      withComponentInputBinding(),
    ),
     provideClientHydration(),
     provideAnimationsAsync(),
     provideHttpClient(),
     provideStore(),
     provideState(categoryFeature),
     provideEffects([CategoryEffects]),
     provideStoreDevtools({
      name: 'cart-app',
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      })
  ]
};


