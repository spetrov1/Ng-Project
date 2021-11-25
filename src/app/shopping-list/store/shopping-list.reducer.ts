import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

// Why not to rename it to ShoppingListState
interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 10),
        new Ingredient("Tomatoes 2", 10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActions
    ) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            let newIngredients = [...state.ingredients];
            let ingredientIndex = action.payload.ingredientIndex;
            let newIngredient = action.payload.ingredient;
            newIngredients[ingredientIndex] = newIngredient;
            return {
                ...state,
                ingredients: newIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingIndToIgnore = action.payload.ingredientIndex;
            return {
                ...state,
                ingredients: state.ingredients.filter( (_, ingIndex) => ingIndex !== ingIndToIgnore )
            }
        default:
            console.log("action print ", action);
            return state;
    }
}