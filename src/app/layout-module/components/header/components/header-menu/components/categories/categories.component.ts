import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../../services/categories-service/categories.service';
import { SearchService } from '../../../../../../services/search-service/search.service';
import { Category, CategoryShort } from '../../../../../../interfaces/categories.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss', '../../../../header.component-adaptive.scss']
})

export class CategoriesComponent implements OnInit, OnDestroy{
  categoriesList!: Array<Category>;
  grandParents!: Array<Category>;
  childrenFirstLayer:  Array<Category> = [];
  childrenSecondLayer: Array<Category> = [];
  menuIsVisible: boolean = false;
  categoryToSearchId: string = '';
  getCategoriesSubs$!: Subscription;
  currentCategory: CategoryShort = {id: '', name: ''}

  constructor(private categoriesService: CategoriesService, private searchService: SearchService, private router: Router) {}
  
  ngOnInit(): void {
    this.getCategoriesSubs$ = this.categoriesService.getAllCategories().subscribe(response => {
      this.categoriesList = response;
      this.grandParents = this.categoriesList
      .filter((category) => category.parentId == this.categoriesService
      .getDefaultcategoryId() && category.name !== 'Anything' && category.name !== 'Default');
    })
  }

  loadMenu(): void {
    this.menuIsVisible = !this.menuIsVisible;
    if (this.menuIsVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  categorySearch(currentCategoryId: string, currentCategoryName: string): void {
    if(currentCategoryId) {
      this.currentCategory.id = currentCategoryId;
      this.currentCategory.name = currentCategoryName
      console.log(this.currentCategory)
      this.searchService.changeSearchInput(this.currentCategory);
      this.loadMenu();
      if (this.router.url !== 'main/search') {
        this.router.navigate(['main/search']);
      }
    };
  }
 
  getByParent(parentName: string, parents: Array<Category>, currentLayer: Array<Category>, categories: Array<Category>): Array<Category> {
    const filteredLayer = categories.filter((category) => category.parentId === parents.find(parent => parent.name === parentName)?.id);
    currentLayer.length = 0;
    Array.prototype.push.apply(currentLayer, filteredLayer);
    return currentLayer;
  }
  
  ngOnDestroy(): void {
    this.getCategoriesSubs$.unsubscribe();
  }
}
