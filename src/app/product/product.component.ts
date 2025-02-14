import { Component, Input, OnInit } from '@angular/core';
import { provideState, Store } from '@ngrx/store';
import { productFeature } from '../store/product/product.selector';
import { CommonModule } from '@angular/common';
import { ProductState } from '../store/product/product.reducer';
import { ProductActions } from '../store/product/product.action';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export  default class ProductComponent implements OnInit {
  @Input() CategoryName :any;
  @Input() test :any;
   
  constructor(private readonly store: Store<ProductState>){

  }

  ngOnInit() : void {
        this.store.dispatch(ProductActions.loadProduct())
  }
//   @Input() set CategoryName(heroId: string) {
//      console.log(heroId);
// }

}
