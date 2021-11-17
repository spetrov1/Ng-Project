import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addItemEvent = new EventEmitter< Ingredient >();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const formValue = form.value;

    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    this.addItemEvent.emit( newIngredient );
  }

}
