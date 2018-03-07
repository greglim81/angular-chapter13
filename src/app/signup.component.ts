import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidator } from './passwordValidator';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector:'login',
    templateUrl: 'signup.component.html'
})
export class SignupComponent  {

    form: FormGroup;   
    invalidLoginMessage;     

    constructor(fb: FormBuilder, private _loginService: LoginService,private _route:ActivatedRoute){        

        this.form = fb.group({
            username:['',Validators.required ],
      password:['',Validators.compose([Validators.required, 
PasswordValidator.cannotContainSpace])]            
        })
    }

    ngOnInit(){                
        this._route.params.subscribe(params => {
            this.invalidLoginMessage = params["invalidLoginMessage"];                                    
        });                 
    }     
    
    onSignup(){        
        var result = this._loginService.signup(this.form.controls['username'].value,this.form.controls['password'].value);       
    }     
  
}