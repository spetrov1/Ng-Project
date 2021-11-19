import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";


export class RecipesService {

    recipesChanged = new Subject<Recipe[]>();
    
    // value is provided by RecipeResolver
    private recipes;

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes.slice()[index];
    }

    addRecipe(newRecipe: Recipe) {
      this.recipes.push(newRecipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(recipeIndex: number, newRecipe: Recipe) {
      this.recipes[recipeIndex] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipeIndex: number) {
      this.recipes.splice(recipeIndex, 1);
      this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

}