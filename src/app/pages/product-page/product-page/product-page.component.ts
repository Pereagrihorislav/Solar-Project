import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductExt } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal-popups/services/modal.service';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss', './product-page.component-adaptive.scss']
})

export class ProductPageComponent implements OnInit {
  product!: ProductExt;
  isEditable: boolean = false;
  currentUserId!: string;
  productId!: string | null;
 
  productSub$!: Subscription;
  productIdSub$!: Subscription;
  getUserSub$!: Subscription;
  authSub$!: Subscription;
  openModalSub$!: Subscription;

  constructor (private productService: ProductService, 
    private modalService: ModalService, 
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.productSub$ = this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); 
      if (this.productId) {
        this.productIdSub$ = this.productService.getProductById(this.productId).subscribe((response) => {
          this.productService.currentLoadedProduct = response;
          this.product = Object.assign({}, this.productService.currentLoadedProduct);

          this.authSub$ = this.authService.authStatus$.subscribe(isAuth => {
            const storedUserId = localStorage.getItem('user-id');
            this.currentUserId = storedUserId ? storedUserId.replace(/"/g, '') : '';
            if(isAuth) {
              this.getUserSub$ = this.userService.currUserId$.subscribe(response => {
                if(response && response == this.product?.user.id) {
                  this.isEditable = true;
                } else if (this.currentUserId == this.product?.user.id){
                  this.isEditable = true;
                } 
              });
            }
          });
        })
      }
    });

    
  }

  editProduct(){
    this.productService.changeEditStatus(true);
    this.router.navigate(['/edit/product']);
  }

  openModal(modalTemplate: TemplateRef<any>): void {
    this.openModalSub$ = this.modalService
      .open(modalTemplate, { size: 'lg', title: `${this.product.user.name}`, value: `${this.product.phone}` })
      .subscribe();
  }

  //I preferred to use a method rather than write pipe
  formatDateTime(dateTimeString: string): string {
    const parsedDate = parseISO(dateTimeString); 
    return format(parsedDate, 'dd.MM.yyyy HH:mm'); 
  }

  ngOnDestroy(): void {
    this.authSub$?.unsubscribe();
    this.productIdSub$?.unsubscribe();
    this.productSub$?.unsubscribe();
    this.openModalSub$?.unsubscribe();
    this.getUserSub$?.unsubscribe();
  }
}
