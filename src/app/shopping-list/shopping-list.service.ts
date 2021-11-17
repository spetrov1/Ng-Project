import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

    startedEditingIngredient = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 10)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        // think about if copy or reference to return ?
        return this.ingredients[index];
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

    updateIngredient(ingIndex: number, newIngredient: Ingredient) {
        this.ingredients[ingIndex] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    delete(ingredientIndex: number) {
        this.ingredients.splice(ingredientIndex, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}