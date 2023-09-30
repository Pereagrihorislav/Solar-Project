import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from '../../../../services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})

export class SearchFormComponent {
  
  public search = '';
  private httpClient : HttpClient;

  constructor(private router: Router, _http: HttpClient, private searchService: SearchService){
    this.httpClient = _http;
  }

  SearchAdvert(): void {
    if (this.search) {
        this.searchService.search(this.search)
        .subscribe((search) => {
          console.log(search);
        });
    }
  }
}