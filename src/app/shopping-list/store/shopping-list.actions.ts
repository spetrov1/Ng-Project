import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";


export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}

}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}

}

export class UpdateIngredient {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: {ingredientIndex: number, ingredient: Ingredient} ) {}

}

export class DeleteIngredient {
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: {ingredientIndex: number}) {}

}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;