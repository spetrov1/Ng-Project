import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators"

import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageService } from "./data-storage.service";


@Injectable()
export class RecipesResolver implements Resolve<Recipe[]> {
    
    constructor(private dataStorage: DataStorageService,
        private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        return this.dataStorage.fetchData().pipe(
            tap( (recipes: Recipe[]) => {
                recipes.map( recipe => 
                                recipe.ingredients = recipe.ingredients ? recipe.ingredients : []
                            );
                }
            ),
            tap( recipes => this.recipesService.setRecipes(recipes) )
        );
    }

}