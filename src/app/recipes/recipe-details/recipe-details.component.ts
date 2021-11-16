import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @ViewChild("dropdownField") dropdownField: ElementRef;
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
