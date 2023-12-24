import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  id!:number;
  product!:Product;
  updateProductForm : FormGroup;
  apiError:any = '';
  isLoading:boolean = false;
  constructor(private _FormBuilder :FormBuilder, private _ProductService : ProductService, private _ToastrService : ToastrService, private _Router : Router, private _ActivatedRoute : ActivatedRoute){
    this.updateProductForm = _FormBuilder.group({
      name : [null, [Validators.required, Validators.pattern("^[A-Za-z].*$")]],
      description : [null, [Validators.required, Validators.pattern("^[A-Za-z].*$")]],
      quantity : [null, [Validators.required, Validators.min(0)]],
      price : [null, [Validators.required, Validators.min(1)]]
    });
    this.getId();
    this.getProductDetails(this.id);
  }
  updateProduct(formData : FormGroup) {
    this.isLoading = true;
    formData.value.id = this.id;
    this._ProductService.updateProduct(formData.value).subscribe({
      next : (response) => {
        if(response.success) {
          this._ToastrService.success(response.data);
          this._Router.navigate(['/home']);
        }else {
          this.apiError = response.error.message;
        }

        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = error.error.message;
        this.isLoading = false;
      }
    })

  }
  getId() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.id = Number(param.get("id"));
      }
    })
  }
  getProductDetails(id : number) {
    this._ProductService.getById(id).subscribe({
      next:(response) => {
        if(response.success) {
          this.product = response.data;
          this.changeInputsValues(this.updateProductForm);
        } else {
          this._ToastrService.error(response.error.message);
        }

      },
      error:(error)=>{
        this._ToastrService.error(error.error);
      }
    })
  }
  changeInputsValues(form : FormGroup) {
    form.get('name')?.patchValue(this.product.name);
    form.get('description')?.patchValue(this.product.description);
    form.get('quantity')?.patchValue(this.product.quantity);
    form.get('price')?.patchValue(this.product.price);
  }
  get name(){
    return this.updateProductForm.get('name');
  }
  get description(){
    return this.updateProductForm.get('description');
  }
  get quantity(){
    return this.updateProductForm.get('quantity');
  }
  get price(){
    return this.updateProductForm.get('price');
  }
}
