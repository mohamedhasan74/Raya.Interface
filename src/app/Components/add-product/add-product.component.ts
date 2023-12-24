import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductForm : FormGroup;
  apiError:any = '';
  isLoading:boolean = false;
  constructor(private _FormBuilder :FormBuilder, private _ProductService : ProductService, private _ToastrService : ToastrService, private _Router : Router){
    this.addProductForm = _FormBuilder.group({
      name : [null, [Validators.required, Validators.pattern("^[A-Za-z].*$")]],
      description : [null, [Validators.required, Validators.pattern("^[A-Za-z].*$")]],
      quantity : [null, [Validators.required, Validators.min(0)]],
      price : [null, [Validators.required, Validators.min(1)]]
    });
  }
  addProduct(formData : FormGroup) {
    console.log(formData)
    this.isLoading = true;
    this._ProductService.addProduct(formData.value).subscribe({
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
        this.apiError = error.error;
        this.isLoading = false;
      }
    })

  }
  get name(){
    return this.addProductForm.get('name');
  }
  get description(){
    return this.addProductForm.get('description');
  }
  get quantity(){
    return this.addProductForm.get('quantity');
  }
  get price(){
    return this.addProductForm.get('price');
  }
}
