import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/pages/services/product-service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss', '../../../../header.component-adaptive.scss']
})
export class AddProductComponent implements OnInit  {
  isDisabled: boolean = false;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.editStatus$.subscribe(response => {
      this.isDisabled = response;
    })
  }
  
  openCreationForm(){
    this.productService.changeEditStatus(false);
    this.router.navigate(['/edit/product']);
  }
}
