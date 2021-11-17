import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private slService: ShoppingListService) { }

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
      this.slService.updateIngredient(this.ingredientIndex, newIngredient);
    } else {
      this.slService.addIngredient( newIngredient );
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.delete(this.ingredientIndex);
    this.onClear();
  }

}
