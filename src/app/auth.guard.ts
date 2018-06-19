import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router:Router){

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
        return this.loginService.isLoggedIn
            .take(1)
            .map((isLoggedIn:boolean) => {
                if(!isLoggedIn){
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;                
            })
    }
    
}
