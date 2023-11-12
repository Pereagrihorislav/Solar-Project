import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { Product } from '../../../interfaces/product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/pages/services/product-service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-users',
  templateUrl: './product-list-users.component.html',
  styleUrls: ['./product-list-users.component.scss', './product-list-users.component-adaptive.scss']
})

export class ProductListUsersComponent implements OnInit, OnDestroy {
  userProducts: Array<Product> = [];
  getUserSub$!: Subscription;

  constructor (private userService: UserService,
    private productService: ProductService,
    private router: Router) {}

  ngOnInit(): void {
    this.getUserSub$ = this.userService.getCurrentUser().subscribe((response) => {
      this.userProducts = response.adverts;
    });
  }

  openCreationForm(){
    this.productService.changeEditStatus(false);
    this.router.navigate(['/edit/product']);
  }

  ngOnDestroy(): void {
    this.getUserSub$?.unsubscribe();
  }
}
