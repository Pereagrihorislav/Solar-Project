import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { ExtCategory, Category } from './categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss', '../../../../header.component-adaptive.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesList!: Array<Category>;
  grandParents!: Array<Category>;
  childrenFirstLayer:  Array<Category> = [];
  childrenSecondLayer: Array<Category> = [];
  defaultCategoryId: string = '00000000-0000-0000-0000-000000000000';
  menuIsVisible: boolean = false;

  constructor(private categoriesServise: CategoriesService) { }
  
  ngOnInit(): void {
    this.categoriesServise.getAllCategories().subscribe((response) => {
      this.categoriesList = response;
      this.grandParents = this.categoriesList
      .filter((category) => category.parentId == this.defaultCategoryId && category.name !== 'Anything' && category.name !== 'Default');
    })
  }

  loadMenu() {
    this.menuIsVisible = !this.menuIsVisible
  }

 

  getByParent(parentName: string, parents: Array<Category>, currentLayer: Array<Category>, categories: Array<Category>): Array<Category> {
    const filteredLayer = categories.filter((category) => category.parentId === parents.find(parent => parent.name === parentName)?.id)
    currentLayer.length = 0;
    Array.prototype.push.apply(currentLayer, filteredLayer);
    return currentLayer;
  }
  
}
