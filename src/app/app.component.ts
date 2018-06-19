import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default">
    <div class="container-fluid">   
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">                                    
            <li><a (click)="onLogout()" *ngIf="isLoggedIn | async">Logout</a></li>
            <li><a routerLink="login" *ngIf="!(isLoggedIn | async)">Login</a></li>            
            <li><a routerLink="signup" *ngIf="!(isLoggedIn | async)">Sign Up</a></li>            
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
    </nav> 
    <router-outlet></router-outlet>        
  `
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private loginService: LoginService){    
  }

  ngOnInit(){
    this.loginService.getCurrentUser();
    this.isLoggedIn = this.loginService.isLoggedIn;        
  }

  onLogout(){
    this.loginService.logout();
  }
  
}
