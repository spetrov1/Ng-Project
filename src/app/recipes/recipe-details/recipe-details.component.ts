import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;

  constructor(private slService: ShoppingListService, 
        private route: ActivatedRoute,
        private router: Router,
        private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
        this.recipe = this.recipesService.getRecipe(this.recipeId);
      }
    )
  }

  onAddToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route } );
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.recipeId);
    this.router.navigate([".."], { relativeTo: this.route }  );
  }

}
