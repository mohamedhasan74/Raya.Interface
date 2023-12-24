import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  products! : Product[];
  productsInStock : number = 0;
  productsOutStock : number = 0;
  constructor(private _ProductService : ProductService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._ProductService.getAll().subscribe({
      next:(response) =>{
        this.products = response.data;
        this.getProductInStockCount();
        this.getProductOutStockCount();
      }
    });
  }
  getProductInStockCount() {
    this.products.map(P => {if(P.quantity > 0) this.productsInStock++});
  }
  getProductOutStockCount() {
    this.products.map(P => {if(P.quantity == 0) this.productsOutStock++});
  }
}
