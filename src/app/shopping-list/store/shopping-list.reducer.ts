import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 10),
        new Ingredient("Tomatoes 2", 10)
      ]
}

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.AddIngredient
    ) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            console.log("action print ", action);
            return state;
    }
}