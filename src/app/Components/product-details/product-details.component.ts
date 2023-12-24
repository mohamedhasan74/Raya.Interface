import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  id!:number;
  product!:Product;
  constructor(private _ActivateRoute : ActivatedRoute, private _ProductService : ProductService, private _ToastrService : ToastrService, private _Router : Router) {

  }
  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails(this.id);
  }
  getProductId() {
    this._ActivateRoute.paramMap.subscribe({
      next:(param) => {
        this.id = Number(param.get('id'));
      }
    })
  }
  getProductDetails(id:number) {
    this._ProductService.getById(id).subscribe({
      next:(response) => {
        if(response.success)
        this.product = response.data;
      else {
        this._ToastrService.error(response.error.message)
      }
      },
      error:(error)=>{
        this._ToastrService.error(error.error.message);
      }
    })
  }
  DeleteProduct() {
    this._ProductService.deleteProduct(this.id).subscribe({
      next:(response) => {
        if(response.success) {
          this._ToastrService.success(response.data);
          this._Router.navigate(['/home']);
        }else {
          this._ToastrService.error(response.error.message);
        }
      }
    });
  }
}
