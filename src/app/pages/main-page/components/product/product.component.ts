import { Component, Input } from '@angular/core';
import { Product } from './product.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { format } from 'date-fns';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product
  
  
  


  public id: Observable<string> = this.activatedRoute.params.pipe(map((r: any) => r.id)); 
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((r) => {})
    this.activatedRoute.queryParams.subscribe((r) => {})
  }


imageSrc(id:string) : string {
  if (!id) return '../../../../assets/img/pictures/noIMGS.png';
  let src = `http://194.87.237.48:5000/Images/${id}`;
  return src
}
}
