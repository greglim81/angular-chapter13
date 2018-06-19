import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import { User } from './user';
import { Observable } from 'rxjs';

@Component({
    selector:'user-form',
    templateUrl: 'user-form.component.html'
})
export class UserFormComponent  {        
    id;
    form: FormGroup;  
    title: string;
    user = new User();    

    userDoc: AngularFirestoreDocument<User>;
    singleUser: Observable<User>;      

    constructor(fb: FormBuilder, private _router:Router,
private afs: AngularFirestore, private _route:ActivatedRoute){        
        this.form = fb.group({
            username:['',Validators.required ],
            email:['',Validators.required]            
        })                
    }

    ngOnInit(){                
        this._route.params.subscribe(params => {
            this.id = params["id"];            
        });      
                
        if(!this.id){
            this.title = "New User";                        
        }
        else{
            this.title = "Edit User";                        
            this.userDoc = this.afs.doc('users/'+this.id);            
            this.singleUser = this.userDoc.valueChanges();
            this.singleUser.subscribe((user) =>{
                this.form.get('username').setValue(user.name);                
                this.form.get('email').setValue(user.email);                                
            });                        
        }               
    }    

    submit(){                                        
        if (this.id) {   
            this.afs.doc('users/'+this.id).update({
                name: this.user.name,	
                email: this.user.email  
            });   ;                                                       
        }
        else{            
            this.afs.collection('users').add({
                name: this.user.name,	
                email: this.user.email  
            });                         
        }                                 
        this._router.navigate(['']);
    } 
}
