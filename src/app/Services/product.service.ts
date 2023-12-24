import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient : HttpClient) { }
  getAll() : Observable<ApiResponse>{
    return this._HttpClient.get<ApiResponse>('https://localhost:44370/api/Product');
  }
  getAllBySearch(name:any,description:any,price:any,quantity:any) : Observable<ApiResponse>{
    let url = `https://localhost:44370/api/Product?`;
    if (name !== null) url += `Name=${name}&`;
    if (description !== null) url += `Description=${description}&`;
    if (price !== null) url += `Price=${price}&`;
    if (quantity !== null) url += `Quantity=${quantity}&`;
    // Remove the trailing '&' if any
    url = url.slice(0, -1);
    return this._HttpClient.get<ApiResponse>(url);
  }
  getById(id:number) : Observable<ApiResponse>{
    return this._HttpClient.get<ApiResponse>(`https://localhost:44370/api/Product/${id}`);
  }
  addProduct(product : Product) : Observable<ApiResponse> {
    return this._HttpClient.post<ApiResponse>(`https://localhost:44370/api/Product`,product);
  }
  updateProduct(product : Product) : Observable<ApiResponse> {
    return this._HttpClient.put<ApiResponse>(`https://localhost:44370/api/Product`,product);
  }
  deleteProduct(id : number) : Observable<ApiResponse> {
    return this._HttpClient.delete<ApiResponse>(`https://localhost:44370/api/Product?id=${id}`);
  }
}
