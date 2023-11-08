import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../../../../services/search-service/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss', '../../../../header.component-adaptive.scss']
})

export class SearchFormComponent {
  search: string = '';
  
  constructor(private router: Router, private searchService: SearchService) {}

  SearchAdvert(): void {
     if(this.search) {
      this.searchService.changeSearchInput(this.search);
      if (this.router.url !== 'main/search') {
        this.router.navigate(['main/search']);
      }
    };
  }
}
