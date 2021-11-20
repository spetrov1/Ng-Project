import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  subscription: Subscription;

  constructor(private dataStorage: DataStorageService,
    private recipesService: RecipesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.userCreation.subscribe(
      (user) => {
        if (!!user) {
          this.isAuthenticated = true;
          this.router.navigate(["/recipes"]);
        }
      }
    )
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

  onLogout() {
    this.authService.logout();
  }

}
