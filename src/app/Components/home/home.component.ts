import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  products!: Product[];
  id!: number;
  constructor(private _FormBuilder: FormBuilder, private _ProductService: ProductService, private _ToastrService: ToastrService) {
    this.searchForm = _FormBuilder.group({
      name: [null, Validators.pattern("^[A-Za-z].*$")],
      description: [null, Validators.pattern("^[A-Za-z].*$")],
      quantity: [null, Validators.min(0)],
      price: [null, Validators.min(1)]
    });
  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this._ProductService.getAll().subscribe({
      next: (response) => {
        this.products = response.data;
      }
    })
  }
  DeleteProduct() {
    this._ProductService.deleteProduct(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this._ToastrService.success(response.data);
          this.getAllProduct();
        } else {
          this._ToastrService.error(response.error.message);
        }
      }
    });
  }
  getId(id: number) {
    this.id = id;
  }
  get name() {
    return this.searchForm.get('name');
  }
  get description() {
    return this.searchForm.get('description');
  }
  get quantity() {
    return this.searchForm.get('quantity');
  }
  get price() {
    return this.searchForm.get('price');
  }
  search(form: FormGroup) {
    let name = form.value.name == '' ? null : form.value.name;
    let description = form.value.description == '' ? null : form.value.description;
    this._ProductService.getAllBySearch(name, description, form.value.price, form.value.quantity).subscribe({
      next: (response) => {
        this.products = response.data;
      }
    });
  }
}
