import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;

  constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private recipesService: RecipesService,
        private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
        this.recipe = this.recipesService.getRecipe(this.recipeId);
      }
    )
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route } );
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.recipeId);
    this.router.navigate([".."], { relativeTo: this.route }  );
  }

}
