import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return this.store.select('auth').pipe(
            map(authState => authState.user),
            take(1), 
            exhaustMap( (user) => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().append("auth", user.token)
                });
                return next.handle(modifiedReq);
            }
            )
        );
    }
    
}