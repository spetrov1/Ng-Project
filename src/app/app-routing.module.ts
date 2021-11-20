import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

import { DefaultDetailsComponent } from "./recipes/recipe-details/default/default-details/default-details.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { AuthGuard } from "./shared/guards/auth-guard";
import { RecipesResolver } from "./shared/recipes-resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: DefaultDetailsComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailsComponent},
        {path: ':id/edit', component: RecipeEditComponent}
    ], resolve: { testResolverName: RecipesResolver }, canActivate: [AuthGuard]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}