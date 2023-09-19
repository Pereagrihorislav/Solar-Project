import { Component, Input } from '@angular/core';
import { Daum } from './product.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Daum

  public id: Observable<string> = this.activatedRoute.params.pipe(map((r: any) => r.id)); 
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((r) => {
      debugger;
    })
    this.activatedRoute.queryParams.subscribe((r) => {
      debugger;
    })
  }

}
