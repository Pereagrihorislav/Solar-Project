import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from 'src/environments/environment.prod';


describe('SearchService', () => {
  let searchService: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });

    searchService = TestBed.inject(SearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
});
