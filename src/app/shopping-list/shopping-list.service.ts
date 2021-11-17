import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 10)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            this.ingredients.push(ingredient);
        }
        this.ingredientsChanged.next(this.ingredients);
    }
}