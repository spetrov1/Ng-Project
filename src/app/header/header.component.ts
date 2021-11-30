import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

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
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(
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
