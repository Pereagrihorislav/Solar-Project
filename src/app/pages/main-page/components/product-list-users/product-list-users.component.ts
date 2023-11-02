import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Product } from '../product/product.interface';

@Component({
  selector: 'app-product-list-users',
  templateUrl: './product-list-users.component.html',
  styleUrls: ['./product-list-users.component.scss']
})
export class ProductListUsersComponent implements OnInit {

  userProducts: Array<Product> | undefined;

  constructor (private userService: UserService ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((response) => {
      console.log(response);
      this.userProducts = response.adverts
      console.log(this.userProducts)
    })
  }

}
