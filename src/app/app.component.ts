import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Daum } from './components/product/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'solar-project';

  products: Daum[] = []

  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this._productService.getProducts().subscribe(resp => {
      this.products = resp.data
    })
  }

}
