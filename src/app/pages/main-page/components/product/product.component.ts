import { Component, Input } from '@angular/core';
import { Product } from './product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public id: Observable<string> = this.activatedRoute.params.pipe(map((r: any) => r.id));

  @Input() product!: Product

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.activatedRoute.params.subscribe();
    this.activatedRoute.queryParams.subscribe();
  }
  
  formatDateTime(dateTimeString: string): string {
    const parsedDate = parseISO(dateTimeString); 
    return format(parsedDate, 'dd.MM.yyyy HH:mm'); 
  }

  openProductPage(id: string): void {
      this.router.navigate([`product/${id}`]);
  }

  imageSrc(id:string) : string {
    if (!id) return '../../../../assets/img/pictures/noIMGS.png';
    let src = `http://194.87.237.48:5000/Images/${id}`;
    return src
  }

}
