import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth-guard";
import { RecipesResolver } from "src/app/shared/recipes-resolver.service";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipesComponent } from "../recipes.component";
import { DefaultDetailsComponent } from "./default/default-details/default-details.component";
import { RecipeDetailsComponent } from "./recipe-details.component";



const routes: Routes = [
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: DefaultDetailsComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailsComponent},
        {path: ':id/edit', component: RecipeEditComponent}
    ], resolve: { testResolverName: RecipesResolver }, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {
    
}