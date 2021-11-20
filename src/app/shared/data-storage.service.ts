import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";


@Injectable( {providedIn: 'root'} )
export class DataStorageService {

    constructor(private recipesService: RecipesService,
        private http: HttpClient,
        private authService: AuthService) {}

    saveData() {
        const recipes = this.recipesService.getRecipes();
        this.http.put<Recipe[]>("https://ng-course-project-36953-default-rtdb.firebaseio.com/recipes.json", recipes)
                    .subscribe(response => console.log("post", response));
        console.log(recipes);
    }

    fetchData() {
        return this.authService.userCreation.pipe(
            take(1), 
            exhaustMap( (user) => {
                return this.http.get<Recipe[]>("https://ng-course-project-36953-default-rtdb.firebaseio.com/recipes.json",
                {
                    params: new HttpParams().append("auth", user.token)
                })
               }
            )
        );
    }
}