import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../../../../services/search-service/search.service';
import { CategoryShort } from 'src/app/layout-module/interfaces/categories.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss', '../../../../header.component-adaptive.scss']
})

export class SearchFormComponent {
  search: string = '';
  searchObj: CategoryShort = {id: '', name: ''}
  
  constructor(private router: Router, private searchService: SearchService) {}

  SearchAdvert(): void {
     if(this.search) {
      this.searchObj.name = this.search
      this.searchService.changeSearchInput(this.searchObj);
      if (this.router.url !== 'main/search') {
        this.router.navigate(['main/search']);
      }
    };
  }
}
