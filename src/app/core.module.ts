import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { RecipesService } from "./recipes/recipes.service";
import { AuthGuard } from "./shared/guards/auth-guard";
import { AuthInterceptorService } from "./shared/interceptors/auth-interceptor.service";
import { RecipesResolver } from "./shared/recipes-resolver.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [
        RecipesService, 
        ShoppingListService, 
        RecipesResolver, 
        AuthService,
        { provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true 
        },
        AuthGuard]
})
export class CoreModule {

}