import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';

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

  it('should change search input', () => {
    const inputValue = 'test input';

    searchService.changeSearchInput(inputValue);
    
    searchService.searchInput.subscribe((input) => {
      expect(input).toBe(inputValue);
    });
  });

  it('should make a POST request with search value', () => {
    const searchValue = 'test search';
    const responseData: any[] = [];

    searchService.search(searchValue).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne('http://194.87.237.48:5000/Advert/search');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ search: searchValue });
    req.flush(responseData);

    httpTestingController.verify();
  });
});
