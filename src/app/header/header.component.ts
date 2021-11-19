import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService,
    private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorage.saveData();
  }

  onFetchData() {
    this.dataStorage.fetchData().subscribe(
      (recipes: Recipe[]) => {
        console.log("fetch", recipes);
        this.recipesService.setRecipes(recipes);
      }
    );
  }

}
