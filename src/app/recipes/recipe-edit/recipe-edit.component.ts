import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
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
    private recipesService: RecipesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.recipeId = +params['id'];
      }
    );

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
            "name": new FormControl(ingredientTemp.name, Validators.required),
            "amount": new FormControl(ingredientTemp.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });

  }

  getIngredients() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);

    if (this.editMode) {
      this.recipesService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(["/recipes"]);
  }

  onCancel() {
    this.router.navigate(["/recipes"]);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
  }

}
