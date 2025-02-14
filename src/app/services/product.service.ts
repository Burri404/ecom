import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../store/product/product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoryId = 'jewelery'
  constructor(private httpClinet: HttpClient) { }
  getProducts(categoryId: any) {
     return this.httpClinet.get<Product[]>(`https://fakestoreapi.com/products/category/${categoryId}`);
  }
}
