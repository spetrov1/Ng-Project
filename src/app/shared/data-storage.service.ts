import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";


@Injectable( {providedIn: 'root'} )
export class DataStorageService {

    constructor(private recipesService: RecipesService,
        private http: HttpClient) {}

    saveData() {
        const recipes = this.recipesService.getRecipes();
        this.http.put<Recipe[]>("https://ng-course-project-36953-default-rtdb.firebaseio.com/recipes.json", recipes)
                    .subscribe(response => console.log("post", response));
        console.log(recipes);
    }

    fetchData() {
        // TODO transform the received data (in case there are no ingredients on a recipe --> add empty list)
        return this.http.get<Recipe[]>("https://ng-course-project-36953-default-rtdb.firebaseio.com/recipes.json")
                        .pipe(
                            tap( (recipes: Recipe[]) => {
                                recipes.map( recipe => recipe.ingredients ? [] : recipe.ingredients = [] );
                            })
                        );
    }
}