import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { Product } from '../../../interfaces/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list-users',
  templateUrl: './product-list-users.component.html',
  styleUrls: ['./product-list-users.component.scss', './product-list-users.component-adaptive.scss']
})

export class ProductListUsersComponent implements OnInit, OnDestroy {
  userProducts: Array<Product> = [];
  getUserSub$!: Subscription;

  constructor (private userService: UserService ) {}

  ngOnInit(): void {
    this.getUserSub$ = this.userService.getCurrentUser().subscribe((response) => {
      this.userProducts = response.adverts;
    });
  }

  ngOnDestroy(): void {
    this.getUserSub$?.unsubscribe();
  }
}
