import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode: boolean = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.recipeId = +params['id'];
      }
    )

    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.recipeId);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      for (let ingredientTemp of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            "name": new FormControl(ingredientTemp.name),
            "amount": new FormControl(ingredientTemp.amount)
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName),
      "imagePath": new FormControl(recipeImagePath),
      "description": new FormControl(recipeDescription),
      "ingredients": recipeIngredients
    });
    
  }

  getIngredients() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onSubmit() {
    console.log("Submitted the form", this.recipeForm);
  }

}
