import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @ViewChild("dropdownField") dropdownField: ElementRef;
  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

}
