import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ExtCategory, Category } from './categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesServise: CategoriesService) { }
  categoriesList!: Array<Category>;
  grandParents!: Array<Category>;
  childrenFirstLayer:  Array<Category> = [];
  childrenSecondLayer: Array<Category> = [];
  defaultCategoryId: string = '00000000-0000-0000-0000-000000000000';
  


  ngOnInit(): void {
   //this.categoriesServise.getCategoryById(this.defaultCategoryId).subscribe((response) => {
   // this.grandParents = response.childs;
  // })

  }
   


  getCat() {
    this.categoriesServise.getAllCategories().subscribe((response) => {
      this.categoriesList = response;
      console.log(this.categoriesList)
      this.grandParents = this.categoriesList
      .filter((category) => category.parentId == this.defaultCategoryId && category.name !== 'Anything' && category.name !== 'Default');
      console.log(this.grandParents)
      
    })
  }


  getByParent(parentName: string, parents: Array<Category>, currentLayer: Array<Category>, categories: Array<Category>): Array<Category> {
    const filteredLayer = categories.filter((category) => category.parentId === parents.find(parent => parent.name === parentName)?.id)
    currentLayer.length = 0;
    Array.prototype.push.apply(currentLayer, filteredLayer);
    return currentLayer;
  }

  /*getSecondLayerByParent(parentName: string, parents: Array<Category>, categories: Array<Category>): Array<Category> {
    console.log(categories.filter((category) => category.parentId === parents.find(parent => parent.name === parentName)?.id))
    
    this.childrenFirstLayer = categories.filter((category) => category.parentId === parents.find(parent => parent.name === parentName)?.id)
    return this.childrenSecondLayer;
  }*/


  getFirstLayerChildren(parentName: string, parentsList: Array<Category>): void {
    parentsList.forEach(category => {
      if(category.name === parentName) {
        this.categoriesServise.getCategoryById(category.id).subscribe((response) => {
          this.childrenFirstLayer = response.childs
          console.log(this.childrenFirstLayer)
        })
      }
    });
  }

  getSecondLayerChildren(parentName: string, parentsList: Array<Category>): void {
    parentsList.forEach(category => {
      if(category.name === parentName) {
        this.categoriesServise.getCategoryById(category.id).subscribe((response) => {
          this.childrenSecondLayer = response.childs
        })
      }
    });
  }

}
