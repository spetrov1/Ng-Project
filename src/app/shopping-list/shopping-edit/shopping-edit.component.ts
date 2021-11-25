import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  subscription = new Subscription();

  editMode = false;
  ingredientIndex: number;
  ingredient: Ingredient;
  @ViewChild("f") form: NgForm;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditingIngredient.subscribe(
      (ingIndex: number) => {
        this.ingredientIndex = ingIndex;
        this.editMode = true;
        this.ingredient = this.slService.getIngredient(ingIndex);
        this.form.setValue( {
          "name": this.ingredient.name,
          "amount": this.ingredient.amount
        } );
        // TODO think about argument type that accept setValue ... I do not understand it
        // this.form.setValue()
      }
    )
  }

  onAddOrUpdateItem() {
    const formValue = this.form.value;

    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      // this.slService.updateIngredient(this.ingredientIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient( 
        {
          ingredientIndex: this.ingredientIndex, 
          ingredient: newIngredient
      }));
    } else {
      // this.slService.addIngredient( newIngredient );
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.slService.deleteIngredient(this.ingredientIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient({ingredientIndex: this.ingredientIndex}));
    this.onClear();
  }

}
